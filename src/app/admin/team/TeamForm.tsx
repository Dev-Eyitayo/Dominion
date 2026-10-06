"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TeamMemberData } from "@/lib/team/types";
import { createTeamMemberAction, updateTeamMemberAction } from "./actions";
import { PhotoIcon, ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface TeamFormProps {
  initialData?: TeamMemberData;
  isEditing?: boolean;
}

export default function TeamForm({ initialData, isEditing = false }: TeamFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    division: initialData?.division || "",
    bio: initialData?.bio || "",
    displayOrder: initialData?.displayOrder ?? 0,
    isActive: initialData?.isActive ?? true,
    imageUrl: initialData?.imageUrl || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file size must not exceed 5MB");
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter the team member's full name");
      return;
    }
    if (!formData.role.trim()) {
      toast.error("Please enter the team member's title / role");
      return;
    }

    setIsSubmitting(true);
    const fd = new FormData();
    fd.append("name", formData.name.trim());
    fd.append("role", formData.role.trim());
    fd.append("division", formData.division.trim());
    fd.append("bio", formData.bio.trim());
    fd.append("displayOrder", String(formData.displayOrder));
    fd.append("isActive", String(formData.isActive));
    if (formData.imageUrl) {
      fd.append("imageUrl", formData.imageUrl);
    }
    if (selectedFile) {
      fd.append("image", selectedFile);
    }

    try {
      const res = isEditing && initialData?.id
        ? await updateTeamMemberAction(initialData.id, fd)
        : await createTeamMemberAction(fd);

      if (res.success) {
        toast.success(
          isEditing
            ? "Team member updated successfully!"
            : "Team member added successfully!"
        );
        router.push("/admin/team");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save team member.");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/team"
            className="p-2 border border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 uppercase">
              {isEditing ? "Edit Team Member" : "Add New Team Member"}
            </h1>
            <p className="text-xs text-slate-500">
              Profile details and biography displayed on the public Our Team and About pages.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#0F2B82] hover:bg-[#0c2266] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4 stroke-[2.5]" />
              <span>{isEditing ? "Save Changes" : "Create Member"}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Photo Upload */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Profile Photo
            </h3>

            <div className="relative aspect-[4/5] bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden group">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white text-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-slate-300">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <PhotoIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <label className="cursor-pointer bg-[#0F2B82] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider inline-block">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-400 mt-2">JPG, PNG, WebP up to 5MB</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Or Photo URL / Path
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                  if (e.target.value.startsWith("http") || e.target.value.startsWith("/")) {
                    setImagePreview(e.target.value);
                  }
                }}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-mono"
                placeholder="/images/team/engineer.jpg"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Visibility &amp; Order
            </h3>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Display Order Number
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82]"
                min={0}
              />
              <p className="text-[10px] text-slate-400 mt-0.5">Lower numbers appear first.</p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#0F2B82] border-slate-300 rounded focus:ring-[#0F2B82]"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Visible on Public Website
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Bio and Member Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              Member Credentials
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Title &amp; Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-semibold text-slate-900"
                  placeholder="e.g. Engr. O. A. Eyitayo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82]"
                  placeholder="e.g. Managing Director & Principal Infrastructure Consultant"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Division / Department Badge
                </label>
                <input
                  type="text"
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-mono uppercase"
                  placeholder="e.g. CIVIL & STRUCTURAL DIVISION"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Biography &amp; Professional Summary
                </label>
                <textarea
                  rows={6}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] leading-relaxed"
                  placeholder="Write a concise professional bio detailing engineering experience, qualifications, and project execution track record..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
