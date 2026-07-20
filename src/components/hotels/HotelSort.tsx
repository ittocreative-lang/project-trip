"use client"

import {
  useRouter,
  useSearchParams,
} from "next/navigation"

type Props = {
  currentSort?: string
}

export default function HotelsSort({
  currentSort,
}: Props) {
  const router = useRouter()

  const searchParams =
    useSearchParams()

  const handleSort = (
    value: string
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      )

    if (!value) {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }

    router.push(
      `/id/hotels?${params.toString()}`
    )
  }

  return (
    <div className="flex items-center gap-3">

      <span className="text-sm font-medium text-slate-600">
        Sort by
      </span>

      <select
        value={currentSort}
        onChange={(e) =>
          handleSort(e.target.value)
        }
        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
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
  )
}