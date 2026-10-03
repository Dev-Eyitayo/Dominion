"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  HeroSlide,
  FacilityContactData,
} from "@/lib/settings/types";
import {
  updateHeroSlidesAction,
  updateFacilityContactsAction,
} from "./actions";
import {
  PlusIcon,
  TrashIcon,
  PhotoIcon,
  RectangleStackIcon,
  BuildingOffice2Icon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface SettingsClientProps {
  initialHeroSlides: HeroSlide[];
  initialFacilityContacts: FacilityContactData;
}

export default function SettingsClient({
  initialHeroSlides,
  initialFacilityContacts,
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"hero" | "facilities">("hero");

  // Hero Slides State
  const [slides, setSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [stagedSlideFiles, setStagedSlideFiles] = useState<{ [index: number]: File }>({});
  const [slidePreviews, setSlidePreviews] = useState<{ [index: number]: string }>({});
  const [isSavingSlides, setIsSavingSlides] = useState(false);

  // Facility Contacts State
  const [facilities, setFacilities] = useState<FacilityContactData>(initialFacilityContacts);
  const [isSavingFacilities, setIsSavingFacilities] = useState(false);

  // Handle slide field change
  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  // Handle slide photo change
  const handleSlidePhotoSelect = (index: number, file: File | null) => {
    if (!file) return;
    setStagedSlideFiles((prev) => ({ ...prev, [index]: file }));
    const objectUrl = URL.createObjectURL(file);
    setSlidePreviews((prev) => ({ ...prev, [index]: objectUrl }));
  };

  // Add new slide
  const handleAddSlide = () => {
    setSlides([
      ...slides,
      {
        img: "/images/hero-construction.jpg",
        title: "New Headline Title",
        highlight: "Engineering Excellence",
        subtitle: "Provide a brief description of the featured engineering scope or announcement.",
        ctaText: "SCHEDULE CONSULTATION",
        ctaLink: "/contact#quote",
      },
    ]);
  };

  // Remove slide
  const handleRemoveSlide = (index: number) => {
    if (slides.length <= 1) {
      toast.error("You need at least one slide for the homepage.");
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
    // Clean up staged files
    const updatedFiles = { ...stagedSlideFiles };
    delete updatedFiles[index];
    setStagedSlideFiles(updatedFiles);
  };

  // Save Hero Slides
  const handleSaveHeroSlides = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSlides(true);

    try {
      const formData = new FormData();
      formData.append("slides", JSON.stringify(slides));

      Object.entries(stagedSlideFiles).forEach(([indexStr, file]) => {
        formData.append(`slideImage_${indexStr}`, file);
      });

      const result = await updateHeroSlidesAction(formData);
      if (result.success) {
        toast.success("Homepage hero slides updated successfully!");
        setStagedSlideFiles({});
      } else {
        toast.error(result.error || "Could not save hero slides.");
      }
    } catch {
      toast.error("A network error occurred while saving your slides.");
    } finally {
      setIsSavingSlides(false);
    }
  };

  // Save Facility Contacts
  const handleSaveFacilities = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingFacilities(true);

    try {
      const result = await updateFacilityContactsAction(facilities);
      if (result.success) {
        toast.success("Facility addresses and hotlines updated across the website!");
      } else {
        toast.error(result.error || "Could not save facility details.");
      }
    } catch {
      toast.error("A network error occurred while saving facility details.");
    } finally {
      setIsSavingFacilities(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Introduction */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Homepage &amp; Company Contact Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage hero banner carousel slides and sync official facility addresses and hotlines across the website.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "hero"
              ? "border-[#0F2B82] text-[#0F2B82] bg-blue-50/40"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <RectangleStackIcon className="w-4 h-4" />
          <span>Hero Carousel Slides ({slides.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("facilities")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-sm transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === "facilities"
              ? "border-[#0F2B82] text-[#0F2B82] bg-blue-50/40"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <BuildingOffice2Icon className="w-4 h-4" />
          <span>Facilities &amp; Contact Hotlines</span>
        </button>
      </div>

      {/* Tab 1: Hero Carousel Slides */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHeroSlides} className="space-y-6">
          <div className="space-y-6">
            {slides.map((slide, idx) => {
              const previewSrc = slidePreviews[idx] || slide.img || "/images/hero-construction.jpg";

              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-sm p-6 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F2B82]">
                      Slide {idx + 1} of {slides.length}
                    </span>
                    {slides.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(idx)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition cursor-pointer"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                        <span>Remove Slide</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Background Photo Preview & Uploader */}
                    <div className="lg:col-span-4 space-y-3">
                      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                        Slide Background Image
                      </label>
                      <div className="relative h-44 w-full rounded-sm border border-slate-200 overflow-hidden bg-slate-900">
                        <Image
                          src={previewSrc}
                          alt={`Hero Slide ${idx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose background photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlidePhotoSelect(idx, e.target.files?.[0] || null)}
                          className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0F2B82] hover:file:bg-blue-100 cursor-pointer"
                        />
                      </label>
                    </div>

                    {/* Right: Headlines & Content */}
                    <div className="lg:col-span-8 space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                            Main Headline Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={slide.title}
                            onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                            placeholder="e.g. Dominion Integrated Electrical &"
                            className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold uppercase tracking-wider text-[#D99B26] mb-1 text-[11px]">
                            Gold Highlight Text *
                          </label>
                          <input
                            type="text"
                            required
                            value={slide.highlight}
                            onChange={(e) => handleSlideChange(idx, "highlight", e.target.value)}
                            placeholder="e.g. Engineering Limited"
                            className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                          Subtitle Narrative *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={slide.subtitle}
                          onChange={(e) => handleSlideChange(idx, "subtitle", e.target.value)}
                          placeholder="Brief summary sentence explaining company capabilities..."
                          className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                            Action Button Text
                          </label>
                          <input
                            type="text"
                            value={slide.ctaText || "SCHEDULE CONSULTATION"}
                            onChange={(e) => handleSlideChange(idx, "ctaText", e.target.value)}
                            placeholder="SCHEDULE CONSULTATION"
                            className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                            Action Button Link
                          </label>
                          <input
                            type="text"
                            value={slide.ctaLink || "/contact#quote"}
                            onChange={(e) => handleSlideChange(idx, "ctaLink", e.target.value)}
                            placeholder="/contact#quote"
                            className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleAddSlide}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Another Slide</span>
            </button>

            <button
              type="submit"
              disabled={isSavingSlides}
              className="bg-[#0F2B82] hover:bg-[#070D1F] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm transition cursor-pointer"
            >
              {isSavingSlides ? "Saving Hero Slides..." : "Save Hero Slides"}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Operational Facilities & Hotlines */}
      {activeTab === "facilities" && (
        <form onSubmit={handleSaveFacilities} className="space-y-6">
          {/* Head Office Card */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-1">
                FACILITY 01
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Corporate Headquarters &amp; Administrative Office
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Facility Display Title *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.headOffice.title}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, title: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Physical Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.headOffice.address}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, address: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Primary Desk Hotline 1 *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.headOffice.hotline1}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, hotline1: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Secondary Desk Hotline 2
                </label>
                <input
                  type="text"
                  value={facilities.headOffice.hotline2}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, hotline2: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={facilities.headOffice.email}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, email: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Working Hours *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.headOffice.hours}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      headOffice: { ...facilities.headOffice, hours: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>
            </div>
          </div>

          {/* Precast Factory Card */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F2B82] font-bold block mb-1">
                FACILITY 02
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Heavy Precast Yard &amp; Moulding Plant
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Plant Display Title *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.factory.title}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      factory: { ...facilities.factory, title: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Plant Location Address *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.factory.address}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      factory: { ...facilities.factory, address: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Yard Direct Phone Line *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.factory.yardDirect}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      factory: { ...facilities.factory, yardDirect: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Operations Scope Description *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.factory.operations}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      factory: { ...facilities.factory, operations: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1 text-[11px]">
                  Loading Fleet &amp; Transport Bay Info *
                </label>
                <input
                  type="text"
                  required
                  value={facilities.factory.logistics}
                  onChange={(e) =>
                    setFacilities({
                      ...facilities,
                      factory: { ...facilities.factory, logistics: e.target.value },
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2 text-xs text-slate-900 rounded-sm focus:outline-none focus:border-[#0F2B82]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSavingFacilities}
              className="bg-[#0F2B82] hover:bg-[#070D1F] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm transition cursor-pointer"
            >
              {isSavingFacilities ? "Saving Facility Details..." : "Save Contact & Facility Details"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
