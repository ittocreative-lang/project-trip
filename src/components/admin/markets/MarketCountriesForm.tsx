"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  marketId: number;

  countries: {
    id: number;
    name: string;
    isoCode: string;
  }[];

  selectedCountryIds: number[];
};

export default function MarketCountriesForm({
  marketId,
  countries,
  selectedCountryIds,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<number[]>(
    selectedCountryIds
  );

  function toggleCountry(id: number) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `/api/admin/markets/${marketId}/countries`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryIds: selected,
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert("Failed to save countries.");
      return;
    }

    router.refresh();

    alert("Countries updated.");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Countries
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the countries that belong to this
          market.
        </p>
      </div>

      <div className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-3">
        {countries.map((country) => {
          const checked = selected.includes(country.id);

          return (
            <label
              key={country.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                checked
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  toggleCountry(country.id)
                }
                className="h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-900">
                  {country.name}
                </p>

                <p className="text-sm text-slate-500">
                  {country.isoCode}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 p-6">
        <p className="text-sm text-slate-500">
          {selected.length} countries selected
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-slate-300 px-5 py-2.5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Countries"}
          </button>
        </div>
      </div>
    </form>
  );
}