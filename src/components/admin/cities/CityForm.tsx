"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Country = {
  id: number;
  name: string;
};

type State = {
  id: number;
  name: string;
  countryId: number;
};

type City = {
  id: number;
  name: string;
  slug: string;
  stateId: number;
};

interface Props {
  city?: City;
  countries: Country[];
  states: State[];
}

export default function CityForm({
  city,
  countries,
  states,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const initialState =
    city
      ? states.find(
          (s) => s.id === city.stateId
        )
      : undefined;

  const [countryId, setCountryId] =
    useState(
      initialState?.countryId
        ?.toString() ?? ""
    );

  const [stateId, setStateId] =
    useState(
      city?.stateId?.toString() ?? ""
    );

  const [name, setName] =
    useState(city?.name ?? "");

  const [slug, setSlug] =
    useState(city?.slug ?? "");

  const filteredStates =
    useMemo(() => {
      if (!countryId) return [];

      return states.filter(
        (state) =>
          state.countryId ===
          Number(countryId)
      );
    }, [countryId, states]);

  useEffect(() => {
    if (!countryId) return;

    const exists =
      filteredStates.some(
        (state) =>
          state.id === Number(stateId)
      );

    if (!exists) {
      setStateId("");
    }
  }, [
    countryId,
    filteredStates,
    stateId,
  ]);

  async function onSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      city
        ? `/api/admin/cities/${city.id}`
        : "/api/admin/cities",
      {
        method: city
          ? "PATCH"
          : "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          stateId: Number(stateId),
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert(
        "Failed to save city."
      );
      return;
    }

    router.push("/admin/cities");
    router.refresh();
  }
    return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      {/* Country */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Country
        </label>

        <select
          value={countryId}
          onChange={(e) =>
            setCountryId(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
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

      {/* State */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          State
        </label>

        <select
          value={stateId}
          onChange={(e) =>
            setStateId(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
          disabled={!countryId}
        >
          <option value="">
            Select State
          </option>

          {filteredStates.map((state) => (
            <option
              key={state.id}
              value={state.id}
            >
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          City Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Bandung"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          placeholder="bandung"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <p className="mt-2 text-xs text-slate-500">
          Leave empty to generate automatically.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="rounded-xl border border-slate-300 px-5 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}