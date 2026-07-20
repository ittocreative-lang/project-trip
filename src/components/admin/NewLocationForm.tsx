"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Country, State, City } from "country-state-city"

interface Props {
  initialCountries?: any[]
}

export default function NewLocationForm({ initialCountries = [] }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [countries] = useState(Country.getAllCountries())
  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])

  const [countryCode, setCountryCode] = useState("")
  const [stateCode, setStateCode] = useState("")
  const [cityName, setCityName] = useState("")

  useEffect(() => {
    if (!countryCode) {
      setStates([])
      setCities([])
      return
    }

    setStates(State.getStatesOfCountry(countryCode))
    setStateCode("")
    setCityName("")
  }, [countryCode])

  useEffect(() => {
    if (!countryCode || !stateCode) {
      setCities([])
      return
    }

    setCities(City.getCitiesOfState(countryCode, stateCode))
    setCityName("")
  }, [countryCode, stateCode])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const country = countries.find((c) => c.isoCode === countryCode)
      const state = states.find((s) => s.isoCode === stateCode)

      const res = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryName: country?.name,
          countryCode,
          stateName: state?.name,
          stateCode,
          cityName,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Gagal menyimpan lokasi")
        setLoading(false)
        return
      }

      router.push("/admin/locations")
      router.refresh()
    } catch {
      setError("Terjadi kesalahan server")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-slate-600">
          ←
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Add Location</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select
            required
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">State / Province</label>
          <select
            required
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            disabled={!countryCode}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
          <select
            required
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            disabled={!stateCode}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:opacity-50"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Location"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-200 px-5 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}