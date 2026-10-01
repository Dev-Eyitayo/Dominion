"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import { createProjectAction, updateProjectAction } from "@/app/admin/projects/actions";

interface GalleryItem {
  url: string;
  publicId?: string;
  caption?: string;
}

interface StagedGalleryFile {
  id: string;
  file: File;
  previewUrl: string;
  caption: string;
}

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: "civil" | "electrical" | "solar" | "manufacturing";
    tag: string;
    location: string;
    client?: string | null;
    summary: string;
    contentHtml: string;
    contentJson?: any;
    featuredImageUrl?: string;
    galleryImages?: GalleryItem[] | null;
    status: "completed" | "ongoing" | "planned";
    isFeatured: boolean;
    displayOrder: number;
  };
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.featuredImageUrl || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Gallery state
  const [existingGallery, setExistingGallery] = useState<GalleryItem[]>(
    initialData?.galleryImages || []
  );
  const [stagedFiles, setStagedFiles] = useState<StagedGalleryFile[]>([]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "civil",
      tag: initialData?.tag || "CIVIL & BUILDING",
      location: initialData?.location || "Oyo State, Nigeria",
      client: initialData?.client || "",
      summary: initialData?.summary || "",
      contentHtml: initialData?.contentHtml || "",
      contentJson: initialData?.contentJson || null,
      status: initialData?.status || "completed",
      isFeatured: initialData?.isFeatured || false,
      displayOrder: initialData?.displayOrder || 0,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
      slug: Yup.string()
        .matches(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens")
        .min(3, "Slug must be at least 3 characters")
        .required("Slug is required"),
      category: Yup.string().required("Please select a category"),
      tag: Yup.string().required("Tag label is required"),
      location: Yup.string().required("Project location is required"),
      summary: Yup.string()
        .min(10, "Summary must be at least 10 characters")
        .required("Summary is required"),
      contentHtml: Yup.string()
        .min(10, "Project description is required")
        .required("Description is required"),
    }),
    onSubmit: async (values) => {
      setServerError(null);

      if (!isEditing && !selectedFile && stagedFiles.length === 0) {
        setServerError("Please select at least one photograph (cover or gallery) for this project.");
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("category", values.category);
      formData.append("tag", values.tag);
      formData.append("location", values.location);
      formData.append("client", values.client || "");
      formData.append("summary", values.summary);
      formData.append("contentHtml", values.contentHtml);
      if (values.contentJson) {
        formData.append("contentJson", JSON.stringify(values.contentJson));
      }
      formData.append("status", values.status);
      formData.append("isFeatured", values.isFeatured ? "true" : "false");
      formData.append("displayOrder", values.displayOrder.toString());

      if (selectedFile) {
        formData.append("featuredImage", selectedFile);
      }

      // Append retained existing gallery
      formData.append("existingGallery", JSON.stringify(existingGallery));

      // Append new staged gallery files & captions
      stagedFiles.forEach((staged) => {
        formData.append("galleryFiles", staged.file);
        formData.append("galleryCaptions", staged.caption || "");
      });

      try {
        let res;
        if (isEditing && initialData?.id) {
          res = await updateProjectAction(initialData.id, formData);
        } else {
          res = await createProjectAction(formData);
        }

        if (!res.success) {
          const errMsg = res.error || "An error occurred while saving the project.";
          setServerError(errMsg);
          toast.error(errMsg);
          setIsSubmitting(false);
          return;
        }

        toast.success(isEditing ? "Project updated successfully." : "Project created successfully.");
        router.push("/admin/projects");
        router.refresh();
      } catch (err) {
        console.error("Project submit error:", err);
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

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleGalleryFilesAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: StagedGalleryFile[] = Array.from(files).map((file, i) => ({
      id: `${Date.now()}_${i}_${Math.random().toString(36).substring(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      caption: "",
    }));

    setStagedFiles((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removeExistingGalleryItem = (index: number) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const updateExistingGalleryCaption = (index: number, caption: string) => {
    setExistingGallery((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], caption };
      return copy;
    });
  };

  const removeStagedFile = (id: string) => {
    setStagedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateStagedCaption = (id: string, caption: string) => {
    setStagedFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, caption } : f))
    );
  };

  const totalPhotosCount = (imagePreview ? 1 : 0) + existingGallery.length + stagedFiles.length;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 max-w-6xl">
      {serverError && (
        <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              General Project Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={handleTitleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. 33kV Overhead Transmission Grid & Substation"
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
                  placeholder="e.g. 33kv-overhead-transmission-grid"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.slug && formik.errors.slug && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category Tag Badge *
                </label>
                <input
                  type="text"
                  name="tag"
                  value={formik.values.tag}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. HIGH VOLTAGE & SUBSTATION"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.tag && formik.errors.tag && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.tag}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Ibadan, Oyo State, Nigeria"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
                {formik.touched.location && formik.errors.location && (
                  <p className="text-[11px] text-red-600 mt-1">{formik.errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Client / Contracting Authority (Optional)
                </label>
                <input
                  type="text"
                  name="client"
                  value={formik.values.client}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Oyo State Ministry of Energy"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Executive Overview Summary *
              </label>
              <textarea
                name="summary"
                rows={3}
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="High-level engineering summary for portfolio cards and search engines..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition"
              />
              {formik.touched.summary && formik.errors.summary && (
                <p className="text-[11px] text-red-600 mt-1">{formik.errors.summary}</p>
              )}
            </div>
          </div>

          {/* Project Photo Gallery Card (Multiple Pictures) */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Project Photo Gallery (Multiple Pictures)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload multiple high-resolution photos of site works, machinery, and structures.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-sm">
                {totalPhotosCount} Total Photos
              </span>
            </div>

            {/* Gallery Upload Input Zone */}
            <div className="border border-dashed border-slate-300 rounded-sm p-4 bg-slate-50 text-center hover:border-blue-500 transition">
              <input
                id="gallery-files-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleGalleryFilesAdd}
                className="hidden"
              />
              <label
                htmlFor="gallery-files-input"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-sm hover:bg-slate-100 transition"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add More Photos (Multi-select supported)</span>
              </label>
              <p className="text-[11px] text-slate-400 mt-1.5">
                PNG, JPG, WEBP. Select multiple files at once.
              </p>
            </div>

            {/* Gallery Photos Grid */}
            {(existingGallery.length > 0 || stagedFiles.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Existing Saved Gallery Photos */}
                {existingGallery.map((item, idx) => (
                  <div
                    key={`existing_${idx}`}
                    className="flex gap-3 p-2.5 rounded-sm border border-slate-200 bg-slate-50 items-start"
                  >
                    <div className="relative w-20 h-16 shrink-0 rounded-sm overflow-hidden bg-slate-200 border border-slate-300">
                      <SafeImage
                        src={item.url}
                        alt={item.caption || "Gallery photo"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <input
                        type="text"
                        value={item.caption || ""}
                        onChange={(e) => updateExistingGalleryCaption(idx, e.target.value)}
                        placeholder="Caption (e.g. Substation installation)"
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Saved photo</span>
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryItem(idx)}
                          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Newly Staged Photos */}
                {stagedFiles.map((staged) => (
                  <div
                    key={staged.id}
                    className="flex gap-3 p-2.5 rounded-sm border border-blue-200 bg-blue-50/40 items-start"
                  >
                    <div className="relative w-20 h-16 shrink-0 rounded-sm overflow-hidden bg-slate-200 border border-blue-300">
                      <SafeImage
                        src={staged.previewUrl}
                        alt="Staged photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <input
                        type="text"
                        value={staged.caption}
                        onChange={(e) => updateStagedCaption(staged.id, e.target.value)}
                        placeholder="Caption (e.g. Foundation civil works)"
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-blue-700 font-medium">Ready to upload</span>
                        <button
                          type="button"
                          onClick={() => removeStagedFile(staged.id)}
                          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full Scope Rich Text Editor Card */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Comprehensive Project Scope &amp; Specifications *
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Format headings, bullet lists, numbered deliverables, tables, and technical specs.
                </p>
              </div>
            </div>

            <RichTextEditor
              content={formik.values.contentHtml}
              onChange={(html, json) => {
                formik.setFieldValue("contentHtml", html);
                formik.setFieldValue("contentJson", json);
              }}
              placeholder="Describe the full engineering scope of works, machinery deployed, and milestones..."
            />
            {formik.touched.contentHtml && formik.errors.contentHtml && (
              <p className="text-[11px] text-red-600 mt-1">{formik.errors.contentHtml}</p>
            )}
          </div>
        </div>

        {/* Sidebar Configuration Area */}
        <div className="space-y-6">
          {/* Featured Cover Photo Card */}
          <div className="bg-white rounded-sm p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Primary Cover Photo *
            </h3>

            {imagePreview ? (
              <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-slate-100 border border-slate-200 group">
                <SafeImage
                  src={imagePreview}
                  alt="Project cover preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <label
                    htmlFor="project-image-input"
                    className="cursor-pointer bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50"
                  >
                    Replace Cover Photo
                  </label>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-slate-300 rounded-sm p-6 text-center hover:border-blue-500 transition bg-slate-50">
                <p className="text-xs font-medium text-slate-700 mb-1">Upload primary cover</p>
                <p className="text-[11px] text-slate-400 mb-3">Hero image for project cards</p>
                <label
                  htmlFor="project-image-input"
                  className="inline-block cursor-pointer bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-slate-50 transition"
                >
                  Browse Cover
                </label>
              </div>
            )}

            <input
              id="project-image-input"
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
            />
          </div>

          {/* Classification & Settings Card */}
          <div className="bg-white rounded-sm p-5 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-3">
              Settings &amp; Publishing
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Core Category *
              </label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-700 font-medium focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
              >
                <option value="civil">Civil Engineering &amp; Construction</option>
                <option value="electrical">High &amp; Low Voltage Grid Power</option>
                <option value="solar">Commercial Solar &amp; Mini-Grids</option>
                <option value="manufacturing">Manufacturing Plant &amp; Poles</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Project Status *
              </label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-700 font-medium focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
              >
                <option value="completed">Completed Project</option>
                <option value="ongoing">Ongoing / In Execution</option>
                <option value="planned">Planned / Scheduled</option>
              </select>
            </div>

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
                  name="isFeatured"
                  checked={formik.values.isFeatured}
                  onChange={formik.handleChange}
                  className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Feature in Homepage Highlights
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
                ? "Saving Project..."
                : isEditing
                ? "Update Project Case Study"
                : "Publish Project"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
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
