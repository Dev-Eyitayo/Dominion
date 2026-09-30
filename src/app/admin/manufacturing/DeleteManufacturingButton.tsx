"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteManufacturingProductAction } from "./actions";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function DeleteManufacturingButton({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteManufacturingProductAction(productId);
      if (res.success) {
        toast.success(`Product "${productTitle}" deleted from catalog.`);
        setShowModal(false);
      } else {
        toast.error(res.error || "Failed to delete product.");
      }
    } catch {
      toast.error("A network error occurred while deleting the product.");
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
        title="Delete Catalog Item"
        message={`Are you sure you want to delete "${productTitle}" from the manufacturing catalog? This action cannot be undone.`}
        confirmLabel="Delete Product"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
