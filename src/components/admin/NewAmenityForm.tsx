"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Category {
  id: string
  name: string
}

interface Props {
  categories: Category[]
}

export default function NewAmenityForm({ categories }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
    categoryId: "",
    isPopular: false,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/amenities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Terjadi kesalahan")
      setLoading(false)
      return
    }

    router.push("/admin/amenities")
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Add Amenity</h1>
        <p className="mt-1 text-sm text-slate-500">Create hotel facility</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Free WiFi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="free-wifi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Icon (Lucide name)</label>
          <input
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="wifi"
          />
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
          <input
            type="checkbox"
            checked={form.isPopular}
            onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
            className="h-4 w-4 rounded text-blue-600"
          />
          <span className="text-sm text-slate-600">Show in Highlights</span>
        </label>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Amenity"}
        </button>
      </form>
    </div>
  )
}