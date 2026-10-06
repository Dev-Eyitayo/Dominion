"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TeamMemberData } from "@/lib/team/types";
import { deleteTeamMemberAction, toggleTeamMemberStatusAction } from "./actions";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface TeamClientProps {
  initialMembers: TeamMemberData[];
}

export default function TeamClient({ initialMembers }: TeamClientProps) {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMemberData[]>(initialMembers);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: newStatus } : m))
    );

    try {
      const res = await toggleTeamMemberStatusAction(id, newStatus);
      if (res.success) {
        toast.success(newStatus ? "Team member activated" : "Team member hidden");
      } else {
        toast.error("Failed to update status");
        router.refresh();
      }
    } catch {
      toast.error("Failed to update status");
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await deleteTeamMemberAction(deletingId);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.id !== deletingId));
        toast.success("Team member deleted successfully");
        setDeletingId(null);
      } else {
        toast.error(res.error || "Failed to delete team member");
      }
    } catch {
      toast.error("Failed to delete member");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F2B82] bg-blue-50 px-2 py-0.5 border border-blue-200 uppercase">
              Personnel &amp; Leadership
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 uppercase">Our Team Members</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage engineering leadership, consultants, supervisors, and bios displayed on the public Our Team and About pages.
          </p>
        </div>

        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 bg-[#0F2B82] hover:bg-[#0c2266] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          <span>Add Team Member</span>
        </Link>
      </div>

      {/* Team Table / Cards */}
      {members.length === 0 ? (
        <div className="bg-white border border-slate-200 p-12 text-center">
          <UserGroupIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900 uppercase">No Team Members Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Click the button below to add your first engineering team member or executive leader.
          </p>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 bg-[#0F2B82] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#0c2266] transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Member</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-200">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar Photo */}
                  <div className="relative w-16 h-20 bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                    <Image
                      src={member.imageUrl || "/images/team/team-engineers.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{member.name}</h3>
                      {member.division && (
                        <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 border border-slate-200 uppercase">
                          {member.division}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 ${
                          member.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {member.isActive ? "ACTIVE" : "HIDDEN"}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#0F2B82]">{member.role}</p>
                    {member.bio && (
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                    <div className="text-[10px] font-mono text-slate-400 pt-1">
                      Display Order: {member.displayOrder}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(member.id, member.isActive)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                      member.isActive
                        ? "border-slate-300 text-slate-600 hover:bg-slate-100"
                        : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {member.isActive ? "Hide" : "Show"}
                  </button>

                  <Link
                    href={`/admin/team/${member.id}/edit`}
                    className="p-2 text-slate-600 hover:text-[#0F2B82] hover:bg-blue-50 border border-slate-300 transition-colors"
                    title="Edit Member"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDeletingId(member.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border border-slate-300 transition-colors cursor-pointer"
                    title="Delete Member"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 border border-slate-300 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase">Confirm Delete Member</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove this team member from the database? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
