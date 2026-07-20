"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  provider: {
    id: string
    name: string
    slug: string
    logo: string | null
  }
}

export default function EditProviderForm({
  provider,
}: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: provider.name,
    slug: provider.slug,
    logo: provider.logo || "",
  })

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await fetch(
        `/api/admin/providers/${provider.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) {
        throw new Error()
      }

      router.push("/admin/providers")
      router.refresh()
    } catch {
      alert("Gagal menyimpan provider")
    }

    setLoading(false)
  }

  async function handleDelete() {
    const ok = confirm(
      "Hapus provider ini?"
    )

    if (!ok) return

    const res = await fetch(
      `/api/admin/providers/${provider.id}`,
      {
        method: "DELETE",
      }
    )

    if (res.ok) {
      router.push("/admin/providers")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-600"
        >
          ←
        </button>

        <h1 className="text-2xl font-bold">
          Edit Provider
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium">
            Provider Name
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
            placeholder="/providers/agoda.png"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        {form.logo && (
          <div className="rounded-lg border p-4">
            <p className="mb-2 text-xs text-gray-500">
              Preview
            </p>

            <img
              src={form.logo}
              alt={form.name}
              className="h-12 object-contain"
            />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-5 py-2 text-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}