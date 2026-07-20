"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface City {
id: string
name: string
state: {
name: string
country: {
name: string
}
}
}

interface Props {
cities: City[]
}

export default function NewHotelForm({
cities,
}: Props) {
const router = useRouter()

const [loading, setLoading] =
useState(false)

const [error, setError] =
useState("")

const [form, setForm] = useState({
name: "",
cityId: "",
address: "",
shortDescription: "",
stars: "3",
priceMin: "",
})

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault()


setLoading(true)
setError("")

try {
  const res = await fetch(
    "/api/admin/hotels",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        cityId: Number(
          form.cityId
        ),
        address:
          form.address,
        shortDescription:
          form.shortDescription,
        stars: Number(
          form.stars
        ),
        priceMin:
          form.priceMin
            ? Number(
                form.priceMin
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
        "Gagal menyimpan hotel"
    )
    setLoading(false)
    return
  }

  router.push(
    `/admin/hotels/${data.id}`
  )

  router.refresh()
} catch {
  setError(
    "Terjadi kesalahan server"
  )
} finally {
  setLoading(false)
}


}

const inputClass =
"mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"

return ( <div className="max-w-3xl"> <div className="mb-6"> <h1 className="text-2xl font-bold">
Add Hotel </h1>


    <p className="text-sm text-slate-500">
      Buat hotel baru
    </p>
  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-6 rounded-xl border border-slate-200 bg-white p-6"
  >
    {error && (
      <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
        {error}
      </div>
    )}

    <div>
      <label>
        Nama Hotel
      </label>

      <input
        required
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name:
              e.target.value,
          })
        }
        className={inputClass}
      />
    </div>

    <div>
      <label>Kota</label>

      <select
        required
        value={form.cityId}
        onChange={(e) =>
          setForm({
            ...form,
            cityId:
              e.target.value,
          })
        }
        className={inputClass}
      >
        <option value="">
          Pilih Kota
        </option>

        {cities.map((city) => (
          <option
            key={city.id}
            value={city.id}
          >
            {city.name} •{" "}
            {
              city.state.name
            }{" "}
            •{" "}
            {
              city.state
                .country.name
            }
          </option>
        ))}
      </select>
    </div>

    <div>
      <label>Alamat</label>

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
        className={inputClass}
      />
    </div>

    <div>
      <label>
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
        className={inputClass}
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label>
          Stars
        </label>

        <select
          value={form.stars}
          onChange={(e) =>
            setForm({
              ...form,
              stars:
                e.target.value,
            })
          }
          className={
            inputClass
          }
        >
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <option
                key={star}
                value={star}
              >
                {star} Star
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label>
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
          className={
            inputClass
          }
        />
      </div>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-2 text-white"
    >
      {loading
        ? "Saving..."
        : "Save Draft"}
    </button>
  </form>
</div>


)
}
