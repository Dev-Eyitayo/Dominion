"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteProjectAction } from "./actions";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function DeleteProjectButton({
  projectId,
  projectTitle,
}: {
  projectId: string;
  projectTitle: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteProjectAction(projectId);
      if (res.success) {
        toast.success(`Project "${projectTitle}" has been deleted.`);
        setShowModal(false);
      } else {
        toast.error(res.error || "Failed to delete project.");
      }
    } catch {
      toast.error("A network error occurred while deleting the project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isDeleting}
        className="px-2.5 py-1 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition disabled:opacity-50 cursor-pointer"
      >
        Delete
      </button>

      <ConfirmModal
        isOpen={showModal}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${projectTitle}"? This will also remove its associated media and cannot be undone.`}
        confirmLabel="Delete Project"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
