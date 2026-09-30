"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteServiceAction } from "./actions";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface DeleteServiceButtonProps {
  id: string;
  title: string;
}

export default function DeleteServiceButton({ id, title }: DeleteServiceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteServiceAction(id);
      if (result.success) {
        toast.success(`Service "${title}" deleted successfully.`);
        setShowModal(false);
      } else {
        toast.error(result.error || "Could not delete service. Please try again.");
      }
    } catch {
      toast.error("A network error occurred while attempting to delete the service.");
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
        title="Delete Service"
        message={`Are you sure you want to permanently delete "${title}"? This action cannot be undone.`}
        confirmLabel="Delete Service"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
