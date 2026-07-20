"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  category?: {
    id: string
    name: string
    slug: string
    sortOrder: number
  }
}

export default function NewAmenityCategoryForm({ category }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    sortOrder: category?.sortOrder || 0,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const method = category ? "PUT" : "POST"
    const url = category 
      ? `/api/admin/amenity-categories/${category.id}`
      : "/api/admin/amenity-categories"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Terjadi kesalahan")
      setLoading(false)
      return
    }

    router.push("/admin/amenity-categories")
    router.refresh()
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {category ? "Edit" : "Tambah"} Category
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kategori amenities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Nama</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Kamar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="kamar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Sort Order</label>
          <input
            type="number"
            required
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="0"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  )
}