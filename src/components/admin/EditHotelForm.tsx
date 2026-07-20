"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface City {
  id: number
  name: string
  state: {
    name: string
    country: {
      name: string
    }
  }
}

interface Props {
  hotel: {
    id: string
    name: string
    slug: string
    cityId: number

    address: string | null
    shortDescription: string | null
    about: string | null

    stars: number

    priceMin: number | null

    officialSite: string | null
    phone: string | null
    email: string | null

    latitude: number | null
    longitude: number | null

    isFeatured: boolean
    status: string
  }
  cities: City[]
}

export default function EditHotelForm({ hotel, cities }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: hotel.name,
    slug: hotel.slug,
    cityId: hotel.cityId.toString(),
    address: hotel.address || "",
    shortDescription: hotel.shortDescription || "",
    about: hotel.about || "",
    stars: hotel.stars.toString(),
    priceMin: hotel.priceMin?.toString() || "",
    officialSite: hotel.officialSite || "",
    phone: hotel.phone || "",
    email: hotel.email || "",
    latitude: hotel.latitude?.toString() || "",
    longitude: hotel.longitude?.toString() || "",
    isFeatured: hotel.isFeatured,
    status: hotel.status,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`/api/admin/hotels/${hotel.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cityId: Number(form.cityId),
          stars: Number(form.stars),
          priceMin: form.priceMin ? Number(form.priceMin) : null,
          latitude: form.latitude ? Number(form.latitude) : null,
          longitude: form.longitude ? Number(form.longitude) : null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to update hotel")
        setLoading(false)
        return
      }

      router.refresh()
      setLoading(false)
    } catch {
      setError("Server error")
      setLoading(false)
    }
  }

  const inputClass = "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  const labelClass = "text-sm font-medium text-slate-700"

  return (
    <div className="max-w-8xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Edit Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Hotel Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <select value={form.cityId} onChange={(e) => setForm({ ...form, cityId: e.target.value })} className={inputClass}>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name} • {city.state.name} • {city.state.country.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Stars</label>
            <input type="number" min="1" max="5" value={form.stars} onChange={(e) => setForm({ ...form, stars: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Price From</label>
            <input type="number" value={form.priceMin} onChange={(e) => setForm({ ...form, priceMin: e.target.value })} className={inputClass} />
          </div>
<div>
  <label className={labelClass}>Status</label>

  <input
    value={form.status}
    disabled
    className={`${inputClass} bg-slate-100`}
  />

  <p className="mt-1 text-xs text-slate-500">
    Status hanya dapat diubah oleh Admin.
  </p>
</div>
        </div>

        <div>
          <label className={labelClass}>Address</label>
          <textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <textarea rows={3} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>About</label>
          <textarea rows={8} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} className={inputClass} />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClass}>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Official Site</label>
            <input value={form.officialSite} onChange={(e) => setForm({ ...form, officialSite: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Latitude</label>
            <input value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} className={inputClass} />
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4" />
          <span className="text-sm text-slate-700">Featured Hotel</span>
        </label>

        <button disabled={loading} className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}