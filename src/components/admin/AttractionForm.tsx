"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import LocationSelect from "./LocationSelect"

interface AttractionFormProps {
  attraction?: {
    id: string
    name: string
    slug: string
    description: string | null
    latitude: number | null
    longitude: number | null
    cityId: number
  }

  countries?: { id: number; name: string }[]
  provinces?: { id: number; name: string; countryId: number }[]
  cities?: { id: number; name: string; stateId: number }[]
}

export default function AttractionForm({
  attraction,
  countries = [],
  provinces = [],
  cities = [],
}: AttractionFormProps) {
  const router = useRouter()
  const isEdit = !!attraction

  const [name, setName] = useState(attraction?.name || "")
  const [description, setDescription] = useState(attraction?.description || "")
  const [cityId, setCityId] = useState(attraction?.cityId || 0)
  const [latitude, setLatitude] = useState(attraction?.latitude?.toString() || "")
  const [longitude, setLongitude] = useState(attraction?.longitude?.toString() || "")
  const [loading, setLoading] = useState(false)

  // Get selected state from city
  const selectedCity = cities.find(c => c.id === cityId)
  const selectedState = selectedCity ? provinces.find(p => p.id === selectedCity.stateId) : null
  const selectedCountry = selectedState ? countries.find(c => c.id === selectedState.countryId) : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    if (!cityId) {
      alert("Please select a city")
      setLoading(false)
      return
    }

    const url = isEdit
      ? `/api/admin/attractions/${attraction.id}`
      : "/api/admin/attractions"

    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        cityId: Number(cityId),
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
      }),
    })

    setLoading(false)

    if (!res.ok) {
      alert("Failed to save")
      return
    }

    router.push("/admin/attractions")
    router.refresh()
  }

  const handleLocationChange = (countryId: number, stateId: number, cityId: number) => {
    if (cityId) {
      setCityId(cityId)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? "Edit Attraction" : "Add Attraction"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isEdit ? "Update attraction details" : "Add a new tourist attraction"}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter attraction name"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location - Country → State → City */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <LocationSelect 
            selectedCountry={selectedCountry?.id}
            selectedState={selectedState?.id}
            selectedCity={attraction?.cityId}
            countries={countries}
            provinces={provinces}
            cities={cities}
            onChange={handleLocationChange}
          />
        </div>

        {/* Coordinates */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Latitude</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="-6.200000"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Longitude</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="106.816666"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this attraction..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        
        <button
          type="button"
          onClick={() => router.push("/admin/attractions")}
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}