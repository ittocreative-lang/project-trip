"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Category {
id: string
name: string
}

interface Props {
amenity: {
id: string
name: string
slug: string
icon: string | null
categoryId: string
isPopular: boolean
}

categories?: Category[]
}

export default function EditAmenityForm({
amenity,
categories = [],
}: Props) {
const router = useRouter()

const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

const [form, setForm] = useState({
name: amenity.name,
slug: amenity.slug,
icon: amenity.icon || "",
categoryId: amenity.categoryId,
isPopular: amenity.isPopular,
})

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault()


setLoading(true)
setError("")

try {
  const res = await fetch(
    `/api/admin/amenities/${amenity.id}`,
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
        "Failed to update amenity"
    )

    setLoading(false)
    return
  }

  router.push("/admin/amenities")
  router.refresh()
} catch {
  setError("Server error")
  setLoading(false)
}


}

return ( <div className="max-w-2xl"> <div className="mb-6"> <h1 className="text-2xl font-bold">
Edit Amenity </h1>


    <p className="mt-1 text-sm text-gray-500">
      Update facility data
    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-5 rounded-xl border border-gray-200 bg-white p-6"
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
        Category
      </label>

      <select
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId:
              e.target.value,
          })
        }
        className="mt-1 w-full rounded-lg border px-3 py-2"
      >
        <option value="">
          Select Category
        </option>

        {categories.map(
          (category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          )
        )}
      </select>
    </div>

    <div>
      <label className="text-sm font-medium">
        Icon
      </label>

      <input
        value={form.icon}
        onChange={(e) =>
          setForm({
            ...form,
            icon: e.target.value,
          })
        }
        placeholder="wifi"
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />

      <p className="mt-1 text-xs text-gray-400">
        Example: wifi, tv, car,
        bath, coffee
      </p>
    </div>

    <label className="flex items-center gap-3 rounded-lg border p-3">
      <input
        type="checkbox"
        checked={form.isPopular}
        onChange={(e) =>
          setForm({
            ...form,
            isPopular:
              e.target.checked,
          })
        }
      />

      <span className="text-sm">
        Show in Highlights section
      </span>
    </label>

    <div className="flex gap-3">
      <button
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        {loading
          ? "Saving..."
          : "Save Changes"}
      </button>

      <button
        type="button"
        onClick={() =>
          router.back()
        }
        className="rounded-lg border px-5 py-2"
      >
        Cancel
      </button>
    </div>
  </form>
</div>


)
}
