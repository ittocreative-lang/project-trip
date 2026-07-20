"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  id: number;
  name: string;
}

export default function DeleteCityButton({
  id,
  name,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function onDelete() {
    const confirmed = window.confirm(
      `Delete city "${name}"?`
    );

    if (!confirmed) return;

    setLoading(true);

    const response = await fetch(
      `/api/admin/cities/${id}`,
      {
        method: "DELETE",
      }
    );

    setLoading(false);

    if (!response.ok) {
      const data =
        await response.json();

      alert(
        data.error ??
          "Failed to delete city."
      );

      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onDelete}
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-red-200
        px-3
        py-2
        text-sm
        text-red-600
        transition
        hover:bg-red-50
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <Trash2 size={16} />

      {loading
        ? "Deleting..."
        : "Delete"}
    </button>
  );
}