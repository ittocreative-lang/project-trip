"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  state?: {
    id: number;
    name: string;
    isoCode: string;
    countryId: number;
  };

  countries: {
    id: number;
    name: string;
  }[];
};

export default function StateForm({
  state,
  countries,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [countryId, setCountryId] = useState(
    state?.countryId?.toString() ?? ""
  );

  const [name, setName] = useState(
    state?.name ?? ""
  );

  const [isoCode, setIsoCode] = useState(
    state?.isoCode ?? ""
  );

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!countryId) {
      alert("Please select a country.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      state
        ? `/api/admin/states/${state.id}`
        : "/api/admin/states",
      {
        method: state ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryId: Number(countryId),
          name: name.trim(),
          isoCode: isoCode.trim().toUpperCase(),
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      alert(
        data?.message ??
          "Failed to save state."
      );

      return;
    }

    router.push("/admin/states");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      {/* Country */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Country
        </label>

        <select
          value={countryId}
          onChange={(e) =>
            setCountryId(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        >
          <option value="">
            Select Country
          </option>

          {countries.map((country) => (
            <option
              key={country.id}
              value={country.id}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          State / Province Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="West Java"
          required
        />
      </div>

      {/* ISO Code */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          ISO Code
        </label>

        <input
          type="text"
          value={isoCode}
          onChange={(e) =>
            setIsoCode(
              e.target.value.toUpperCase()
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase outline-none focus:border-blue-500"
          placeholder="JB"
          required
        />

        <p className="mt-2 text-xs text-slate-500">
          Example: JB, JT, BA, CA
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}