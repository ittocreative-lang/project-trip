"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewAmenityCategoryForm() {
  const router = useRouter()

  const [name, setName] =
    useState("")

  const [sortOrder, setSortOrder] =
    useState(0)

  const [loading, setLoading] =
    useState(false)

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    const res = await fetch(
      "/api/admin/amenity-categories",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          sortOrder,
        }),
      }
    )

    if (res.ok) {
      router.push(
        "/admin/amenity-categories"
      )

      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">
        Tambah Kategori
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-xl border bg-white p-6"
      >
        <div>
          <label className="text-sm font-medium">
            Nama
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Urutan
          </label>

          <input
            type="number"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                Number(e.target.value)
              )
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          {loading
            ? "Menyimpan..."
            : "Simpan"}
        </button>
      </form>
    </div>
  )
}