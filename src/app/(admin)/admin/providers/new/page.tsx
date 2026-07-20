"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewProviderPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    slug: "",
    logo: "",
  })

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        "/api/admin/providers",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        setLoading(false)
        return
      }

      router.push("/admin/providers")
      router.refresh()
    } catch {
      setError("Server error")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">
        Add Provider
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium">
            Name
          </label>

          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Slug
          </label>

          <input
            required
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Logo URL
          </label>

          <input
            value={form.logo}
            onChange={(e) =>
              setForm({
                ...form,
                logo: e.target.value,
              })
            }
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {loading
            ? "Saving..."
            : "Save Provider"}
        </button>
      </form>
    </div>
  )
}