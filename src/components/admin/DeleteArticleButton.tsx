"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface DeleteArticleButtonProps {
  id: string
  title: string
}

export default function DeleteArticleButton({ id, title }: DeleteArticleButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Hapus article "${title}"?`)) return

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      })

      const result = await res.json().catch(() => ({ error: "Unknown error" }))

      if (!res.ok) {
        alert(result.error || "Gagal menghapus")
      } else {
        router.refresh()
      }
    } catch (error) {
      alert("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 disabled:opacity-50"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  )
}