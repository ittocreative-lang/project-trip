"use client"

import {
useRouter,
useSearchParams,
} from "next/navigation"

import { SlidersHorizontal } from "lucide-react"

type Props = {
cities: {
id: number
name: string
}[]
}

export default function HotelFilters({
cities,
}: Props) {
const router = useRouter()

const searchParams =
useSearchParams()

/* CURRENT VALUES */
const currentCity =
searchParams.get("city") || ""

const currentSort =
searchParams.get("sort") || ""

const currentMinPrice =
searchParams.get("minPrice") || ""

const currentMaxPrice =
searchParams.get("maxPrice") || ""

/* UPDATE FILTER */
const updateFilter = (
key: string,
value: string
) => {
const params =
new URLSearchParams(
searchParams.toString()
)


if (!value) {
  params.delete(key)
} else {
  params.set(key, value)
}

router.push(
  `/id/hotels?${params.toString()}`
)


}

/* RESET */
const resetFilters = () => {
router.push("/id/hotels")
}

return ( <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">


  {/* HEADER */}
  <div className="flex items-start justify-between gap-4">

    <div>
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <SlidersHorizontal className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Filters
          </h2>

          <p className="text-sm text-slate-500">
            Refine your hotel search
          </p>
        </div>
      </div>
    </div>

    <button
      onClick={resetFilters}
      className="text-sm font-medium text-blue-600 hover:text-blue-700"
    >
      Reset
    </button>
  </div>

  {/* CITY */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-800">
      Destination
    </label>

    <select
      value={currentCity}
      onChange={(e) =>
        updateFilter(
          "city",
          e.target.value
        )
      }
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500"
    >
      <option value="">
        All cities
      </option>

      {cities.map((city) => (
        <option
          key={city.id}
          value={city.name}
        >
          {city.name}
        </option>
      ))}
    </select>
  </div>

  {/* PRICE */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-800">
      Price Range
    </label>

    <div className="grid grid-cols-2 gap-3">

      <input
        type="number"
        placeholder="Min price"
        value={currentMinPrice}
        onChange={(e) =>
          updateFilter(
            "minPrice",
            e.target.value
          )
        }
        className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />

      <input
        type="number"
        placeholder="Max price"
        value={currentMaxPrice}
        onChange={(e) =>
          updateFilter(
            "maxPrice",
            e.target.value
          )
        }
        className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500"
      />

    </div>
  </div>

  {/* SORT */}
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-800">
      Sort By
    </label>

    <select
      value={currentSort}
      onChange={(e) =>
        updateFilter(
          "sort",
          e.target.value
        )
      }
      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500"
    >
      <option value="">
        Recommended
      </option>

      <option value="price_asc">
        Lowest Price
      </option>

      <option value="price_desc">
        Highest Price
      </option>

      <option value="rating_desc">
        Best Rating
      </option>
    </select>
  </div>

  {/* QUICK FILTERS */}
  <div className="space-y-3 border-t border-slate-100 pt-5">

    <h3 className="text-sm font-semibold text-slate-800">
      Popular Filters
    </h3>

    <div className="flex flex-wrap gap-2">

      <button
        onClick={() =>
          updateFilter(
            "sort",
            "rating_desc"
          )
        }
        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
      >
        Top Rated
      </button>

      <button
        onClick={() =>
          updateFilter(
            "sort",
            "price_asc"
          )
        }
        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
      >
        Budget Hotels
      </button>

      <button
        onClick={() =>
          updateFilter(
            "minPrice",
            "1000000"
          )
        }
        className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
      >
        Luxury
      </button>

    </div>
  </div>
</div>


)
}
