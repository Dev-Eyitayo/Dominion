"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import {
  createManufacturingProductAction,
  updateManufacturingProductAction,
} from "@/app/admin/manufacturing/actions";

interface SpecItem {
  key: string;
  value: string;
}

interface ManufacturingFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: "poles" | "blocks" | "kerbs" | "drainage" | "custom";
    technicalSpecs?: Record<string, string> | null;
    descriptionHtml: string;
    descriptionJson?: any;
    imageUrl?: string;
    isAvailable: boolean;
    displayOrder: number;
  };
  isEditing?: boolean;
}

export default function ManufacturingForm({
  initialData,
  isEditing = false,
}: ManufacturingFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Initialize specs from key-value object
  const [specs, setSpecs] = useState<SpecItem[]>(() => {
    if (initialData?.technicalSpecs && typeof initialData.technicalSpecs === "object") {
      const items: SpecItem[] = [];
      for (const [key, value] of Object.entries(initialData.technicalSpecs)) {
        items.push({ key, value: String(value) });
      }
      return items.length > 0 ? items : [{ key: "", value: "" }];
    }
    return [
      { key: "Overall Length", value: "10.0 meters" },
      { key: "Working Load", value: "450 kgf" },
      { key: "Concrete Grade", value: "C40/50" },
    ];
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "poles",
      descriptionHtml: initialData?.descriptionHtml || "",
      descriptionJson: initialData?.descriptionJson || null,
      isAvailable: initialData?.isAvailable ?? true,
      displayOrder: initialData?.displayOrder || 0,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
      slug: Yup.string()
        .matches(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens")
        .min(3, "Slug must be at least 3 characters")
        .required("URL Slug is required"),
      category: Yup.string().required("Please select a category"),
      descriptionHtml: Yup.string()
        .min(10, "Please provide product description in the rich text editor")
        .required("Description is required"),
    }),
    onSubmit: async (values) => {
      setServerError(null);

      if (!isEditing && !selectedFile) {
        setServerError("Please upload a photograph for this product.");
        return;
      }

      setIsSubmitting(true);

      const specsObject: Record<string, string> = {};
      specs.forEach((item) => {
        const trimmedKey = item.key.trim();
        const trimmedVal = item.value.trim();
        if (trimmedKey && trimmedVal) {
          specsObject[trimmedKey] = trimmedVal;
        }
      });

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("category", values.category);
      formData.append("technicalSpecs", JSON.stringify(specsObject));
      formData.append("descriptionHtml", values.descriptionHtml);
      if (values.descriptionJson) {
        formData.append("descriptionJson", JSON.stringify(values.descriptionJson));
      }
      formData.append("isAvailable", values.isAvailable ? "true" : "false");
      formData.append("displayOrder", values.displayOrder.toString());

      if (selectedFile) {
        formData.append("productImage", selectedFile);
      }

      try {
        let res;
        if (isEditing && initialData?.id) {
          res = await updateManufacturingProductAction(initialData.id, formData);
        } else {
          res = await createManufacturingProductAction(formData);
        }

        if (!res.success) {
          const errMsg = res.error || "An error occurred while saving the product.";
          setServerError(errMsg);
          toast.error(errMsg);
          setIsSubmitting(false);
          return;
        }

        toast.success(isEditing ? "Catalog product updated successfully." : "Catalog product published successfully.");
        router.push("/admin/manufacturing");
        router.refresh();
      } catch (err) {
        console.error("Manufacturing product submit error:", err);
        const errMsg = "A network error occurred. Please try again.";
        setServerError(errMsg);
        toast.error(errMsg);
        setIsSubmitting(false);
      }
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (!isEditing && (!formik.values.slug || formik.values.slug === generateSlug(formik.values.title))) {
      formik.setFieldValue("slug", generateSlug(e.target.value));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-6xl">
      {serverError && (
        <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Product Identity
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={handleTitleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. 10.0m High Tension (HT) Concrete Electric Pole"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-[11px] text-red-600 mt-1">{formik.errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. 10m-ht-concrete-electric-pole"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.slug && formik.errors.slug && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Precast Category *
                </label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-700 font-medium focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                >
                  <option value="poles">Concrete Electric Poles</option>
                  <option value="blocks">Stay Blocks &amp; Anchor Slabs</option>
                  <option value="kerbs">Hydraulic Road Kerbs</option>
                  <option value="drainage">Precast Drainage &amp; Slabs</option>
                  <option value="custom">Custom Precast Elements</option>
                </select>
              </div>
            </div>
          </div>

          {/* Technical Specifications Key-Value Builder */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Technical Specifications Table
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add concrete strength, dimensions, rebar, load rating, and DisCo compliance standards.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSpec}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition cursor-pointer"
              >
                <span>+ Add Row</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {specs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    placeholder="Spec Name (e.g. Length)"
                    className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    placeholder="Value (e.g. 10.0m)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                  {specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition cursor-pointer"
                      title="Remove row"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Rich Text Editor Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Full Product Description &amp; Engineering Details
            </h3>

            <RichTextEditor
              content={formik.values.descriptionHtml}
              onChange={(html, json) => {
                formik.setFieldValue("descriptionHtml", html);
                formik.setFieldValue("descriptionJson", json);
              }}
              placeholder="Describe manufacturing curing methods, concrete mix grades, and compliance..."
            />
            {formik.touched.descriptionHtml && formik.errors.descriptionHtml && (
              <p className="text-[11px] text-red-600 mt-1">{formik.errors.descriptionHtml}</p>
            )}
          </div>
        </div>

        {/* Sidebar Configuration */}
        <div className="space-y-6">
          {/* Product Image Card */}
          <div className="bg-white rounded-sm p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Product Photograph
            </h3>

            {imagePreview ? (
              <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-slate-100 border border-slate-200 group">
                <SafeImage
                  src={imagePreview}
                  alt="Product preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <label
                    htmlFor="manufacturing-image-input"
                    className="cursor-pointer bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50"
                  >
                    Replace Photo
                  </label>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-sm p-6 text-center hover:border-blue-400 transition bg-slate-50/50">
                <p className="text-xs font-medium text-slate-700 mb-1">Upload catalog photo</p>
                <p className="text-[11px] text-slate-400 mb-3">PNG, JPG, WEBP up to 10MB</p>
                <label
                  htmlFor="manufacturing-image-input"
                  className="inline-block cursor-pointer bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50 transition"
                >
                  Browse Files
                </label>
              </div>
            )}

            <input
              id="manufacturing-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Availability & Settings */}
          <div className="bg-white rounded-sm p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Stock &amp; Priority
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Display Order Priority
              </label>
              <input
                type="number"
                name="displayOrder"
                value={formik.values.displayOrder}
                onChange={formik.handleChange}
                placeholder="0"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formik.values.isAvailable}
                  onChange={formik.handleChange}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Available for Immediate Supply
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-slate-50 rounded-sm p-4 border border-slate-200 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-semibold rounded-sm transition cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Catalog Product"
                : "Publish Product"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/manufacturing")}
              className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-sm transition cursor-pointer"
            >
              Cancel &amp; Return
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
