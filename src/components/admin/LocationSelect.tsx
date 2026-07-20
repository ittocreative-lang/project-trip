"use client"

import { useState } from "react"

interface LocationSelectProps {
  selectedCountry?: number
  selectedState?: number
  selectedCity?: number
  onChange?: (countryId: number, stateId: number, cityId: number) => void
}

// Props dari parent (Server Component akan传递 data)
interface LocationSelectPropsFull extends LocationSelectProps {
  countries: { id: number; name: string }[]
  provinces: { id: number; name: string; countryId: number }[]
  cities: { id: number; name: string; stateId: number }[]
}

export default function LocationSelect({
  selectedCountry,
  selectedState,
  selectedCity,
  onChange,
  countries,
  provinces,
  cities,
}: LocationSelectPropsFull) {
  const [countryId, setCountryId] = useState(selectedCountry || 0)
  const [stateId, setStateId] = useState(selectedState || 0)
  const [cityId, setCityId] = useState(selectedCity || 0)

  // Filter provinces by country
  const countryProvinces = provinces.filter(p => p.countryId === countryId)

  // Filter cities by state
  const stateCities = cities.filter(c => c.stateId === stateId)

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    setCountryId(id)
    setStateId(0)
    setCityId(0)
    onChange?.(id, 0, 0)
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    setStateId(id)
    setCityId(0)
    onChange?.(countryId, id, 0)
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    setCityId(id)
    onChange?.(countryId, stateId, id)
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
        <select
          value={countryId}
          onChange={handleCountryChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Select Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State/Province */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Province</label>
        <select
          value={stateId}
          onChange={handleStateChange}
          disabled={countryId === 0 || countryProvinces.length === 0}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        >
          <option value={0}>Select Province</option>
          {countryProvinces.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
        <select
          value={cityId}
          onChange={handleCityChange}
          disabled={stateId === 0 || stateCities.length === 0}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
        >
          <option value={0}>Select City</option>
          {stateCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}