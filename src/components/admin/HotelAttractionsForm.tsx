"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Search } from "lucide-react"

interface Attraction {
  id: string
  name: string
  distanceKm?: number
}

interface SelectedAttraction {
  attractionId: string
  name: string
}

interface Props {
  hotelId: string
  attractions: Attraction[]
  selectedAttractions: SelectedAttraction[]
}

export default function HotelAttractionsForm({ hotelId, attractions, selectedAttractions }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Attraction[]>([])
  const [nearest, setNearest] = useState<Attraction[]>([])
  const [selected, setSelected] = useState<SelectedAttraction[]>([])

  useEffect(() => {
    fetch(`/api/admin/hotels/${hotelId}/nearby`)
      .then((res) => res.json())
      .then(setNearest)
  }, [hotelId])

  useEffect(() => {
    setSelected(selectedAttractions.map((item) => ({
      attractionId: item.attractionId,
      name: item.name,
    })))
  }, [selectedAttractions])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      const res = await fetch(`/api/admin/attractions/search?q=${query}`)
      const data = await res.json()
      setResults(data)
    }, 300)
    return () => clearTimeout(timeout)
  }, [query])

  function addAttraction(attraction: Attraction) {
    if (selected.find((item) => item.attractionId === attraction.id)) return
    setSelected([...selected, { attractionId: attraction.id, name: attraction.name }])
  }

  function removeAttraction(attractionId: string) {
    setSelected(selected.filter((item) => item.attractionId !== attractionId))
  }

  async function handleSave() {
    setLoading(true)
    await fetch(`/api/admin/hotels/${hotelId}/attractions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attractions: selected.map((item) => ({ attractionId: item.attractionId, selected: true })),
      }),
    })
    router.refresh()
    setLoading(false)
  }

  const boxStyle = "border border-slate-200 bg-white p-4 rounded-lg"

  return (
    <div className="p-6 space-y-4 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Nearby Attractions</h1>
        <p className="text-sm text-slate-500">Pilih tempat menarik terdekat</p>
      </div>

      {/* NEAREST */}
      <div className={boxStyle}>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Nearest</h2>
        <div className="grid grid-cols-2 gap-2">
          {nearest.map((item) => (
            <button
              key={item.id}
              onClick={() => addAttraction(item)}
              className="flex items-center justify-between p-2 rounded border border-slate-200 hover:border-blue-400 text-left transition"
            >
              <span className="text-sm">{item.name}</span>
              <span className="text-xs text-slate-400">{item.distanceKm}km</span>
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className={boxStyle}>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Search</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari attraction..."
            className="w-full pl-9 pr-3 py-2 rounded border border-slate-200 text-sm"
          />
        </div>
        {results.length > 0 && (
          <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
            {results.map((item) => (
              <button
                key={item.id}
                onClick={() => addAttraction(item)}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-50 text-left text-sm"
              >
                <span>{item.name}</span>
                <Plus size={14} className="text-blue-600" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SELECTED */}
      <div className={boxStyle}>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Selected ({selected.length})</h2>
        {selected.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada yang dipilih</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((item) => (
              <span
                key={item.attractionId}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
              >
                {item.name}
                <button onClick={() => removeAttraction(item.attractionId)} className="hover:text-red-500">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 py-2 rounded-lg text-white font-medium hover:bg-blue-700">
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  )
}