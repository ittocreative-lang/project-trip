"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Amenity {
id: string
name: string
slug: string
}

interface Category {
id: string
name: string
amenities: Amenity[]
}

interface Props {
hotelId: string
categories: Category[]
selectedAmenities: string[]
}

export default function HotelAmenitiesForm({
hotelId,
categories,
selectedAmenities,
}: Props) {
const router = useRouter()

const [loading, setLoading] =
useState(false)

const [selected, setSelected] =
useState<string[]>(
selectedAmenities
)

async function handleSubmit() {
setLoading(true)


try {
  await fetch(
    `/api/admin/hotels/${hotelId}/amenities`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        amenityIds: selected,
      }),
    }
  )

  router.refresh()
} finally {
  setLoading(false)
}


}

function toggleAmenity(
amenityId: string
) {
if (
selected.includes(
amenityId
)
) {
setSelected(
selected.filter(
(id) =>
id !== amenityId
)
)
} else {
setSelected([
...selected,
amenityId,
])
}
}

return ( <div className="space-y-6">


  <div>
    <h1 className="text-2xl font-bold">
      Hotel Amenities
    </h1>

    <p className="mt-1 text-sm text-gray-500">
      Select facilities available
      at this hotel
    </p>
  </div>

  <div className="space-y-5">

    {categories.map(
      (category) => (
        <div
          key={category.id}
          className="rounded-xl border border-gray-200 bg-white p-5"
        >
          <h2 className="mb-4 font-semibold">
            {category.name}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.amenities.map(
              (amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(
                      amenity.id
                    )}
                    onChange={() =>
                      toggleAmenity(
                        amenity.id
                      )
                    }
                  />

                  <span className="text-sm">
                    {amenity.name}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      )
    )}
  </div>

  <div className="flex justify-end">
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700"
    >
      {loading
        ? "Saving..."
        : "Save Amenities"}
    </button>
  </div>
</div>


)
}
