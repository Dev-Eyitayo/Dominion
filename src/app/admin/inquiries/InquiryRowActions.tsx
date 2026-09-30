"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInquiryStatusAction, deleteInquiryAction } from "./actions";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
  XMarkIcon,
  TagIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface InquiryData {
  id: string;
  clientName: string;
  phone: string;
  email: string | null;
  serviceType: string;
  location: string;
  scopeDetails: string;
  status: "new" | "under_review" | "quoted" | "archived";
  adminNotes: string | null;
  createdAt: string | Date;
}

interface InquiryRowActionsProps {
  inquiry: InquiryData;
}

export default function InquiryRowActions({ inquiry }: InquiryRowActionsProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(inquiry.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [notes, setNotes] = useState(inquiry.adminNotes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [copied, setCopied] = useState(false);

  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("0")
    ? `234${cleanPhone.slice(1)}`
    : cleanPhone.startsWith("234")
    ? cleanPhone
    : `234${cleanPhone}`;

  const whatsappMessage = encodeURIComponent(
    `Hello ${inquiry.clientName}, this is regarding your inquiry with Dominion Integrated Electrical & Engineering Limited for "${inquiry.serviceType}".`
  );

  const handleStatusChange = async (newStatus: "new" | "under_review" | "quoted" | "archived") => {
    setIsUpdating(true);
    setCurrentStatus(newStatus);
    try {
      const result = await updateInquiryStatusAction(inquiry.id, newStatus, notes);
      if (result.success) {
        toast.success(`Inquiry marked as ${newStatus.replace("_", " ")}`);
        router.refresh();
      } else {
        toast.error(result.error || "Could not update status.");
        setCurrentStatus(inquiry.status);
      }
    } catch {
      toast.error("A network error occurred while updating the status.");
      setCurrentStatus(inquiry.status);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const result = await updateInquiryStatusAction(inquiry.id, currentStatus, notes);
      if (result.success) {
        toast.success("Admin notes saved.");
        router.refresh();
      } else {
        toast.error(result.error || "Could not save notes.");
      }
    } catch {
      toast.error("Network error saving notes.");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteInquiryAction(inquiry.id);
      if (result.success) {
        toast.success(`Inquiry from "${inquiry.clientName}" deleted.`);
        setIsConfirmDeleteOpen(false);
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Could not delete inquiry.");
      }
    } catch {
      toast.error("Network error while deleting inquiry.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCopySummary = () => {
    const summaryText = `DOMINION RFQ LEAD DOSSIER
Client: ${inquiry.clientName}
Phone: ${inquiry.phone}
Email: ${inquiry.email || "N/A"}
Service: ${inquiry.serviceType}
Location: ${inquiry.location}
Status: ${currentStatus.toUpperCase()}
Date: ${new Date(inquiry.createdAt).toLocaleString("en-GB")}

Scope / Requirements:
${inquiry.scopeDetails}
${notes ? `\nInternal Notes: ${notes}` : ""}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast.success("Lead dossier copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-500",
          label: "New Lead",
        };
      case "under_review":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          dot: "bg-blue-500",
          label: "Under Review",
        };
      case "quoted":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-500",
          label: "Quoted",
        };
      case "archived":
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          dot: "bg-slate-400",
          label: "Archived",
        };
    }
  };

  const statusBadge = getStatusBadge(currentStatus);

  return (
    <>
      <div className="flex items-center justify-end gap-2 text-xs">
        <select
          value={currentStatus}
          disabled={isUpdating}
          onChange={(e) =>
            handleStatusChange(e.target.value as "new" | "under_review" | "quoted" | "archived")
          }
          className="border border-slate-200 bg-white px-2.5 py-1 text-xs rounded-sm font-medium text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          <option value="new">New</option>
          <option value="under_review">Under Review</option>
          <option value="quoted">Quoted</option>
          <option value="archived">Archived</option>
        </select>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 text-xs font-semibold rounded-sm border border-slate-200 transition flex items-center gap-1 cursor-pointer"
        >
          <EyeIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>Details</span>
        </button>
      </div>

      {/* Light, Soft, Easy-on-the-Eyes Lead Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-sm border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
            
            {/* Header: Clean, Light & Easy on the Eyes */}
            <div className="bg-white p-5 sm:p-6 border-b border-slate-200 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold tracking-wider uppercase border border-slate-200">
                      <TagIcon className="w-3 h-3 text-slate-500" />
                      RFQ #{inquiry.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[11px] font-semibold border uppercase tracking-wider ${statusBadge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                      {statusBadge.label}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
                    {inquiry.clientName}
                  </h2>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-5 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5">
                      <CalendarDaysIcon className="w-4 h-4 text-slate-400" />
                      {new Date(inquiry.createdAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-slate-400" />
                      {inquiry.location}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition shrink-0 cursor-pointer"
                  title="Close Modal"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Contact Bar (Soft Colors) */}
            <div className="bg-slate-50/70 border-b border-slate-200 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  Quick Actions:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/${formattedPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Lead</span>
                </a>

                <a
                  href={`tel:${inquiry.phone}`}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <PhoneIcon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Call ({inquiry.phone})</span>
                </a>

                {inquiry.email && (
                  <a
                    href={`mailto:${inquiry.email}?subject=Dominion Engineering Quotation / Inquiry Follow-up`}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <EnvelopeIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Send Email</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-sm transition inline-flex items-center gap-1.5 cursor-pointer"
                  title="Copy Dossier Details to Clipboard"
                >
                  {copied ? (
                    <>
                      <ClipboardDocumentCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* Information Cards Grid (Gentle slate backgrounds) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Card 1: Contact */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm p-3.5 space-y-2">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-500 flex items-center gap-1.5">
                    <PhoneIcon className="w-3.5 h-3.5 text-slate-600" />
                    Client Contact
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Phone Number</span>
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="font-bold text-slate-900 hover:text-blue-700 text-xs font-mono"
                      >
                        {inquiry.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Email Address</span>
                      {inquiry.email ? (
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="font-medium text-slate-800 hover:text-blue-700 truncate block"
                        >
                          {inquiry.email}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card 2: Service & Site */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm p-3.5 space-y-2">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-500 flex items-center gap-1.5">
                    <MapPinIcon className="w-3.5 h-3.5 text-slate-600" />
                    Project Scope
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Service Category</span>
                      <span className="font-bold text-slate-900 block leading-tight">
                        {inquiry.serviceType}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Site Location / State</span>
                      <span className="font-medium text-slate-800 block">
                        {inquiry.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Status Management */}
                <div className="bg-slate-50 border border-slate-200 rounded-sm p-3.5 space-y-2">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-500 flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5 text-slate-600" />
                    Status Pipeline
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-slate-400 block text-[10px]">Update Lead Status</span>
                    <select
                      value={currentStatus}
                      disabled={isUpdating}
                      onChange={(e) =>
                        handleStatusChange(
                          e.target.value as "new" | "under_review" | "quoted" | "archived"
                        )
                      }
                      className="w-full border border-slate-300 bg-white px-2 py-1 text-xs rounded-sm font-semibold text-slate-800 focus:outline-none focus:border-slate-400 cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="under_review">Under Review</option>
                      <option value="quoted">Quoted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical Scope & Client Request */}
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    <DocumentTextIcon className="w-4 h-4 text-slate-500" />
                    <span>Project Scope &amp; Client Specifications</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {inquiry.scopeDetails.length} chars
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed select-text font-normal">
                    {inquiry.scopeDetails}
                  </p>
                </div>
              </div>

              {/* Internal Engineering Notes & Follow-up Log */}
              <div className="border border-slate-200 rounded-sm overflow-hidden bg-white space-y-0">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Internal Follow-up Notes
                  </span>
                  <span className="text-[10px] text-slate-400 italic">Visible only to admins</span>
                </div>
                <div className="p-4 space-y-3 bg-white">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Spoke with client, site survey arranged for Thursday; proposal sent via WhatsApp."
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-sm p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white text-xs font-semibold px-3.5 py-1.5 rounded-sm transition cursor-pointer"
                    >
                      {isSavingNotes ? "Saving..." : "Save Notes"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(true)}
                disabled={isDeleting}
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete Lead Record</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-sm border border-slate-300 transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        title="Delete RFQ Inquiry"
        message={`Are you sure you want to permanently delete the inquiry submitted by "${inquiry.clientName}"? This action cannot be reverted.`}
        confirmLabel="Delete Inquiry"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setIsConfirmDeleteOpen(false)}
      />
    </>
  );
}
