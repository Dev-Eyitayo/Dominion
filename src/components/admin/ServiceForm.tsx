"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { createServiceAction, updateServiceAction } from "@/app/admin/services/actions";

interface ServiceFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    categoryBadge: string;
    summary: string;
    deliverables: string[] | null;
    featuredImageUrl?: string;
    displayOrder: number;
  };
  isEditing?: boolean;
}

const serviceValidationSchema = Yup.object({
  title: Yup.string().required("Please enter a service title").max(255, "Title is too long"),
  slug: Yup.string()
    .required("Please enter a URL slug")
    .matches(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  categoryBadge: Yup.string().required("Please enter a category badge").max(100),
  summary: Yup.string().required("Please provide a summary").min(10, "Summary is too short"),
  displayOrder: Yup.number().integer().default(0),
});

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.featuredImageUrl || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deliverables, setDeliverables] = useState<string[]>(
    initialData?.deliverables || [
      "Site survey, feasibility assessment, and technical appraisal",
      "Statutory compliance review, engineering drawings, and regulatory filing",
      "Full project execution, safety management, and commissioning",
    ]
  );
  const [newDeliverableInput, setNewDeliverableInput] = useState("");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setDeliverables([...deliverables, newDeliverableInput.trim()]);
    setNewDeliverableInput("");
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleUpdateDeliverable = (index: number, value: string) => {
    const updated = [...deliverables];
    updated[index] = value;
    setDeliverables(updated);
  };

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      categoryBadge: initialData?.categoryBadge || "STRUCTURAL & HEAVY CIVIL",
      summary: initialData?.summary || "",
      displayOrder: initialData?.displayOrder || 0,
    },
    validationSchema: serviceValidationSchema,
    onSubmit: async (values) => {
      setServerError(null);

      if (!isEditing && !selectedFile) {
        setServerError("Please select a featured image photograph for this service.");
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("categoryBadge", values.categoryBadge);
      formData.append("summary", values.summary);
      formData.append("deliverables", JSON.stringify(deliverables.filter((d) => d.trim().length > 0)));
      formData.append("displayOrder", values.displayOrder.toString());

      if (selectedFile) {
        formData.append("featuredImage", selectedFile);
      }

      try {
        let result;
        if (isEditing && initialData) {
          result = await updateServiceAction(initialData.id, formData);
        } else {
          result = await createServiceAction(formData);
        }

        if (result.success) {
          toast.success(isEditing ? "Engineering service updated successfully." : "Engineering service published successfully.");
          router.push("/admin/services");
          router.refresh();
        } else {
          const errMsg = result.error || "Failed to save engineering service. Please try again.";
          setServerError(errMsg);
          toast.error(errMsg);
        }
      } catch (err) {
        const errMsg = "An unexpected network error occurred. Please try again.";
        setServerError(errMsg);
        toast.error(errMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
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
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Service Identity
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (!isEditing || !formik.values.slug) {
                    formik.setFieldValue("slug", generateSlug(e.target.value));
                  }
                }}
                onBlur={formik.handleBlur}
                placeholder="e.g. Civil Engineering & Building Construction"
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
                  placeholder="e.g. civil-engineering-construction"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.slug && formik.errors.slug && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category Badge *
                </label>
                <input
                  type="text"
                  name="categoryBadge"
                  value={formik.values.categoryBadge}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. STRUCTURAL & HEAVY CIVIL"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.categoryBadge && formik.errors.categoryBadge && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.categoryBadge}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Executive Scope Summary *
              </label>
              <textarea
                name="summary"
                rows={4}
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="High-level technical overview of what this engineering service provides to corporate and public infrastructure clients..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              />
              {formik.touched.summary && formik.errors.summary && (
                <p className="text-[11px] text-red-600 mt-1">{formik.errors.summary}</p>
              )}
            </div>
          </div>

          {/* Deliverables Builder Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Deliverables &amp; Scope Points
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  List the key deliverables, milestones, or technical stages provided under this capability.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">
                {deliverables.length} Deliverables
              </span>
            </div>

            <div className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-semibold text-slate-400">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleUpdateDeliverable(idx, e.target.value)}
                    placeholder="Describe deliverable..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition cursor-pointer"
                    title="Remove deliverable"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={newDeliverableInput}
                onChange={(e) => setNewDeliverableInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                placeholder="Add a new deliverable..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-sm transition cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Featured Photograph
            </h3>

            {imagePreview ? (
              <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-slate-100 border border-slate-200 group">
                <Image
                  src={imagePreview}
                  alt="Service preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <label
                    htmlFor="service-photo-input"
                    className="cursor-pointer bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50 transition"
                  >
                    Replace Photo
                  </label>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-300 rounded-sm p-6 text-center hover:border-blue-500 transition bg-slate-50/50">
                <div className="w-10 h-10 rounded-sm bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-slate-700 mb-1">Upload service photo</p>
                <p className="text-[11px] text-slate-400 mb-3">PNG, JPG, WEBP up to 10MB</p>
                <label
                  htmlFor="service-photo-input"
                  className="inline-block cursor-pointer bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50 transition"
                >
                  Browse Files
                </label>
              </div>
            )}

            <input
              id="service-photo-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Ordering */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Display Sequence
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
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first on the public service directory.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-slate-50 rounded-sm p-5 border border-slate-200 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-semibold rounded-sm transition cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Service"
                : "Publish Service"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/services")}
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
