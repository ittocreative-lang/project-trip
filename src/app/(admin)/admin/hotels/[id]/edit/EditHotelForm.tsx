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

address: string

shortDescription: string
about: string

stars: number
priceMin: number | null

officialSite: string
phone: string
email: string

latitude: number | null
longitude: number | null

isFeatured: boolean
status: string


}

cities: City[]
}

export default function EditHotelForm({
hotel,
cities,
}: Props) {
const router = useRouter()

const [loading, setLoading] =
useState(false)

const [error, setError] =
useState("")

const [form, setForm] =
useState({
name: hotel.name,
slug: hotel.slug,


  cityId:
    hotel.cityId.toString(),

  address:
    hotel.address || "",

  shortDescription:
    hotel.shortDescription ||
    "",

  about:
    hotel.about || "",

  stars:
    hotel.stars.toString(),

  priceMin:
    hotel.priceMin?.toString() ||
    "",

  officialSite:
    hotel.officialSite || "",

  phone:
    hotel.phone || "",

  email:
    hotel.email || "",

  latitude:
    hotel.latitude?.toString() ||
    "",

  longitude:
    hotel.longitude?.toString() ||
    "",

  isFeatured:
    hotel.isFeatured,

  status:
    hotel.status,
})


async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault()


setLoading(true)
setError("")

try {
  const res = await fetch(
    `/api/admin/hotels/${hotel.id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        ...form,

        cityId: Number(
          form.cityId
        ),

        stars: Number(
          form.stars
        ),

        priceMin:
          form.priceMin
            ? Number(
                form.priceMin
              )
            : null,

        latitude:
          form.latitude
            ? Number(
                form.latitude
              )
            : null,

        longitude:
          form.longitude
            ? Number(
                form.longitude
              )
            : null,
      }),
    }
  )

  const data =
    await res.json()

  if (!res.ok) {
    setError(
      data.error ||
        "Failed to update hotel"
    )

    setLoading(false)
    return
  }

  router.refresh()

  setLoading(false)
} catch {
  setError(
    "Server error"
  )

  setLoading(false)
}


}

return ( <div className="max-w-5xl"> <h1 className="mb-6 text-2xl font-bold">
Edit Hotel </h1>


  <form
    onSubmit={handleSubmit}
    className="space-y-6 rounded-xl border bg-white p-6"
  >
    {error && (
      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
        {error}
      </div>
    )}

    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="text-sm font-medium">
          Hotel Name
        </label>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
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
              slug:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          City
        </label>

        <select
          value={form.cityId}
          onChange={(e) =>
            setForm({
              ...form,
              cityId:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        >
          {cities.map(
            (city) => (
              <option
                key={city.id}
                value={
                  city.id
                }
              >
                {city.name}
                {" • "}
                {
                  city.state
                    .name
                }
                {" • "}
                {
                  city.state
                    .country
                    .name
                }
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Stars
        </label>

        <input
          type="number"
          min="1"
          max="5"
          value={form.stars}
          onChange={(e) =>
            setForm({
              ...form,
              stars:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Price From
        </label>

        <input
          type="number"
          value={
            form.priceMin
          }
          onChange={(e) =>
            setForm({
              ...form,
              priceMin:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Status
        </label>

        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        >
          <option value="published">
            Published
          </option>

          <option value="draft">
            Draft
          </option>
        </select>
      </div>
    </div>

    <div>
      <label className="text-sm font-medium">
        Address
      </label>

      <textarea
        rows={3}
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address:
              e.target.value,
          })
        }
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />
    </div>

    <div>
      <label className="text-sm font-medium">
        Short Description
      </label>

      <textarea
        rows={3}
        value={
          form.shortDescription
        }
        onChange={(e) =>
          setForm({
            ...form,
            shortDescription:
              e.target.value,
          })
        }
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />
    </div>

    <div>
      <label className="text-sm font-medium">
        About
      </label>

      <textarea
        rows={8}
        value={form.about}
        onChange={(e) =>
          setForm({
            ...form,
            about:
              e.target.value,
          })
        }
        className="mt-1 w-full rounded-lg border px-3 py-2"
      />
    </div>

    <div className="grid gap-5 md:grid-cols-3">
      <div>
        <label className="text-sm font-medium">
          Phone
        </label>

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Email
        </label>

        <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Official Site
        </label>

        <input
          value={
            form.officialSite
          }
          onChange={(e) =>
            setForm({
              ...form,
              officialSite:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="text-sm font-medium">
          Latitude
        </label>

        <input
          value={
            form.latitude
          }
          onChange={(e) =>
            setForm({
              ...form,
              latitude:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Longitude
        </label>

        <input
          value={
            form.longitude
          }
          onChange={(e) =>
            setForm({
              ...form,
              longitude:
                e.target.value,
            })
          }
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
    </div>

    <label className="flex items-center gap-3 rounded-lg border p-3">
      <input
        type="checkbox"
        checked={
          form.isFeatured
        }
        onChange={(e) =>
          setForm({
            ...form,
            isFeatured:
              e.target.checked,
          })
        }
      />

      <span>
        Featured Hotel
      </span>
    </label>

    <button
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-2 text-white"
    >
      {loading
        ? "Saving..."
        : "Save Changes"}
    </button>
  </form>
</div>


)
}
