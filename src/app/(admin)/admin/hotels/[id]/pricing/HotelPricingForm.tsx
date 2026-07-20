"use client"

import { useState } from "react"

interface Provider {
  id: string
  name: string
}

interface HotelProvider {
  providerId: string
  price: number | null
  affiliateUrl: string
  isAvailable: boolean
  currency?: string
}

interface Props {
  hotelId: string
  providers: Provider[]
  hotelProviders: HotelProvider[]
}

export default function HotelPricingForm({
  hotelId,
  providers,
  hotelProviders,
}: Props) {
  const [loading, setLoading] = useState(false)

  const [rows, setRows] = useState(
    providers.map((provider) => {
      const existing = hotelProviders.find(
        (item) => item.providerId === provider.id
      )

      return {
        providerId: provider.id,
        providerName: provider.name,

        price: existing?.price ?? "",

        affiliateUrl:
          existing?.affiliateUrl ?? "",

        currency:
          existing?.currency ?? "IDR",

        isAvailable:
          existing?.isAvailable ?? true,
      }
    })
  )

  async function handleSave() {
    try {
      setLoading(true)

      const response = await fetch(
        `/api/admin/hotels/${hotelId}/pricing`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            providers: rows.map((row) => ({
              providerId: row.providerId,

              price:
                row.price === ""
                  ? null
                  : Number(row.price),

              affiliateUrl:
                row.affiliateUrl,

              currency: row.currency,

              isAvailable:
                row.isAvailable,
            })),
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to save pricing"
        )
      }

      alert("Pricing updated")
    } catch (error) {
      console.error(error)

      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Provider Pricing
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage hotel prices from booking
          providers
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Provider
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Price
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Currency
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Affiliate URL
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Available
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.providerId}
                className="border-t border-slate-200"
              >
                {/* PROVIDER */}
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-800">
                    {row.providerName}
                  </div>
                </td>

                {/* PRICE */}
                <td className="px-4 py-4">
                  <input
                    type="number"
                    placeholder="0"
                    value={row.price}
                    onChange={(e) => {
                      const copy = [...rows]

                      copy[index].price =
                        e.target.value

                      setRows(copy)
                    }}
                    className="w-32 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
                  />
                </td>

                {/* CURRENCY */}
                <td className="px-4 py-4">
                  <select
                    value={row.currency}
                    onChange={(e) => {
                      const copy = [...rows]

                      copy[index].currency =
                        e.target.value

                      setRows(copy)
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
                  >
                    <option value="IDR">
                      IDR
                    </option>

                    <option value="USD">
                      USD
                    </option>

                    <option value="SGD">
                      SGD
                    </option>

                    <option value="MYR">
                      MYR
                    </option>
                  </select>
                </td>

                {/* URL */}
                <td className="px-4 py-4">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={row.affiliateUrl}
                    onChange={(e) => {
                      const copy = [...rows]

                      copy[index].affiliateUrl =
                        e.target.value

                      setRows(copy)
                    }}
                    className="w-full min-w-[260px] rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
                  />
                </td>

                {/* AVAILABLE */}
                <td className="px-4 py-4">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={row.isAvailable}
                      onChange={(e) => {
                        const copy = [...rows]

                        copy[index].isAvailable =
                          e.target.checked

                        setRows(copy)
                      }}
                      className="h-4 w-4"
                    />

                    Active
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : "Save Pricing"}
        </button>
      </div>
    </div>
  )
}