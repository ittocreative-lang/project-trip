"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface City {
  id: number
  name: string
  slug: string
}

interface State {
  id: number
  name: string
  isoCode: string
  cities: City[]
}

interface Country {
  id: number
  name: string
  isoCode: string
  states: State[]
}

interface Props {
  country: Country
}

export default function EditLocationForm({
  country,
}: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    countryName: country.name,
    isoCode: country.isoCode,
  })

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        `/api/admin/locations/${country.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(
          data.error ||
            "Terjadi kesalahan"
        )
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
    <div className="max-w-4xl">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600"
        >
          ←
        </button>

        <div>
          <h1 className="text-2xl font-bold">
            Edit Country
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {country.name}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Country */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
            Country Information
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Country Name
              </label>

              <input
                required
                value={form.countryName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    countryName:
                      e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                ISO Code
              </label>

              <input
                required
                maxLength={2}
                value={form.isoCode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isoCode:
                      e.target.value.toUpperCase(),
                  })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase"
              />
            </div>

          </div>
        </div>

        {/* States */}
        <div>
          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              States / Provinces
            </h2>

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white"
            >
              + Add State
            </button>

          </div>

          <div className="space-y-3">

            {country.states.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
                No states found
              </div>
            ) : (
              country.states.map((state) => (
                <div
                  key={state.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-medium">
                        {state.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ISO: {state.isoCode}
                      </p>

                      <p className="text-sm text-gray-500">
                        {
                          state.cities.length
                        }{" "}
                        cities
                      </p>
                    </div>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                      >
                        Manage Cities
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border border-blue-200 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </button>

                    </div>

                  </div>

                  {state.cities.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {state.cities
                        .slice(0, 10)
                        .map((city) => (
                          <span
                            key={city.id}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {city.name}
                          </span>
                        ))}

                      {state.cities.length >
                        10 && (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                          +
                          {state.cities
                            .length - 10}{" "}
                          more
                        </span>
                      )}
                    </div>
                  )}

                </div>
              ))
            )}

          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  )
}