"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { AboutPageData } from "@/lib/settings/types";
import { updateAboutContentAction } from "./actions";
import {
  DocumentTextIcon,
  EyeIcon,
  ShieldCheckIcon,
  PhotoIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface AboutClientProps {
  initialData: AboutPageData;
}

export default function AboutClient({ initialData }: AboutClientProps) {
  const [data, setData] = useState<AboutPageData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "vision" | "values">("overview");

  // Image Upload States
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [overviewFile, setOverviewFile] = useState<File | null>(null);
  const [overviewPreview, setOverviewPreview] = useState<string | null>(null);

  const handleBannerSelect = (file: File | null) => {
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleOverviewSelect = (file: File | null) => {
    if (!file) return;
    setOverviewFile(file);
    setOverviewPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("content", JSON.stringify(data));
      if (bannerFile) {
        formData.append("bannerImage", bannerFile);
      }
      if (overviewFile) {
        formData.append("overviewImage", overviewFile);
      }

      const res = await updateAboutContentAction(formData);
      if (res.success && res.data) {
        setData(res.data);
        setBannerFile(null);
        setOverviewFile(null);
        toast.success("About Us page content updated successfully!");
      } else {
        toast.error(res.error || "Failed to update content");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateCoreValue = (index: number, field: "title" | "desc", val: string) => {
    const updated = [...data.coreValues];
    updated[index] = { ...updated[index], [field]: val };
    setData({ ...data, coreValues: updated });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F2B82] bg-blue-50 px-2 py-0.5 border border-blue-200 uppercase">
              Page Content Management
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 uppercase">About Us Page</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify corporate overview narrative, vision, mission, and the 8 core operational values displayed on the public About page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[#0F2B82] hover:bg-[#0c2266] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4 stroke-[2.5]" />
              <span>Save About Page</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "overview"
              ? "border-[#0F2B82] text-[#0F2B82] bg-blue-50/40"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <DocumentTextIcon className="w-4 h-4" />
          <span>Overview &amp; Hero Banner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vision")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "vision"
              ? "border-[#0F2B82] text-[#0F2B82] bg-blue-50/40"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <EyeIcon className="w-4 h-4" />
          <span>Vision &amp; Mission</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("values")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "values"
              ? "border-[#0F2B82] text-[#0F2B82] bg-blue-50/40"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <ShieldCheckIcon className="w-4 h-4" />
          <span>8 Core Values</span>
        </button>
      </div>

      {/* Tab 1: Overview & Hero Banner */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#0F2B82]" />
              Top Banner Section &amp; Background Photo
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Banner Image Uploader & Preview */}
              <div className="lg:col-span-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Banner Background Photo
                </label>
                <div className="relative h-40 w-full border border-slate-200 overflow-hidden bg-slate-900">
                  <Image
                    src={bannerPreview || data.bannerImageUrl || "/images/hero-construction.jpg"}
                    alt="About Banner Background"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <label className="block">
                  <span className="sr-only">Choose banner photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleBannerSelect(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0F2B82] hover:file:bg-blue-100 cursor-pointer"
                  />
                </label>
              </div>

              {/* Banner Text Inputs */}
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline / Category Badge
                    </label>
                    <input
                      type="text"
                      value={data.headerTag}
                      onChange={(e) => setData({ ...data, headerTag: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white font-mono"
                      placeholder="e.g. COMPANY PROFILE & LEADERSHIP"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Main Headline
                    </label>
                    <input
                      type="text"
                      value={data.headerTitle}
                      onChange={(e) => setData({ ...data, headerTitle: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white font-bold"
                      placeholder="e.g. Building Excellence, Powering the Future"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Banner Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={data.headerSubtitle}
                    onChange={(e) => setData({ ...data, headerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white leading-relaxed"
                    placeholder="Brief lead-in text under the main headline"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#0F2B82]" />
              Company Overview &amp; Story Image
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Overview Image Uploader & Preview */}
              <div className="lg:col-span-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Overview Feature Photo
                </label>
                <div className="relative h-48 w-full border border-slate-200 overflow-hidden bg-slate-900">
                  <Image
                    src={overviewPreview || data.overviewImageUrl || "/images/hero-construction.jpg"}
                    alt="About Overview Feature Photo"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose overview photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleOverviewSelect(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0F2B82] hover:file:bg-blue-100 cursor-pointer"
                  />
                </label>
              </div>

              {/* Narrative Text */}
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Tag
                    </label>
                    <input
                      type="text"
                      value={data.overviewTag}
                      onChange={(e) => setData({ ...data, overviewTag: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={data.overviewHeading}
                      onChange={(e) => setData({ ...data, overviewHeading: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paragraph 1 (Establishment &amp; Registration)
                    </label>
                    <textarea
                      rows={2}
                      value={data.overviewParagraph1}
                      onChange={(e) => setData({ ...data, overviewParagraph1: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paragraph 2 (Mandate &amp; Core Disciplines)
                    </label>
                    <textarea
                      rows={2}
                      value={data.overviewParagraph2}
                      onChange={(e) => setData({ ...data, overviewParagraph2: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Paragraph 3 (Footprint &amp; Expertise)
                    </label>
                    <textarea
                      rows={2}
                      value={data.overviewParagraph3}
                      onChange={(e) => setData({ ...data, overviewParagraph3: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] focus:ring-1 focus:ring-[#0F2B82] bg-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vision & Mission */}
      {activeTab === "vision" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0F2B82] flex items-center justify-center">
                <EyeIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Corporate Vision
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vision Badge
              </label>
              <input
                type="text"
                value={data.visionTag}
                onChange={(e) => setData({ ...data, visionTag: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vision Title
              </label>
              <input
                type="text"
                value={data.visionTitle}
                onChange={(e) => setData({ ...data, visionTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vision Statement
              </label>
              <textarea
                rows={4}
                value={data.visionDesc}
                onChange={(e) => setData({ ...data, visionDesc: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] leading-relaxed"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0F2B82] flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Corporate Mission
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mission Badge
              </label>
              <input
                type="text"
                value={data.missionTag}
                onChange={(e) => setData({ ...data, missionTag: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mission Title
              </label>
              <input
                type="text"
                value={data.missionTitle}
                onChange={(e) => setData({ ...data, missionTitle: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mission Statement
              </label>
              <textarea
                rows={4}
                value={data.missionDesc}
                onChange={(e) => setData({ ...data, missionDesc: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Core Values */}
      {activeTab === "values" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2 h-2 rounded-full bg-[#0F2B82]" />
              Core Values Section Headers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section Tag
                </label>
                <input
                  type="text"
                  value={data.coreValuesTag}
                  onChange={(e) => setData({ ...data, coreValuesTag: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data.coreValuesHeading}
                  onChange={(e) => setData({ ...data, coreValuesHeading: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-bold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coreValues.map((val, idx) => (
              <div key={val.num} className="bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-[#0F2B82] font-mono font-bold text-xs flex items-center justify-center">
                    {val.num}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Value #{idx + 1}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Value Title
                  </label>
                  <input
                    type="text"
                    value={val.title}
                    onChange={(e) => updateCoreValue(idx, "title", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={val.desc}
                    onChange={(e) => updateCoreValue(idx, "desc", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-[#0F2B82] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
