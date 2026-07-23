"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  country?: {
    id: number;
    name: string;
    isoCode: string;
    isActive: boolean;
    isDefault: boolean;
  };
};

export default function CountryForm({
  country,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(
    country?.name ?? ""
  );

  const [isoCode, setIsoCode] = useState(
    country?.isoCode ?? ""
  );

  const [isActive, setIsActive] = useState(
    country?.isActive ?? true
  );

  const [isDefault, setIsDefault] = useState(
    country?.isDefault ?? false
  );

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const body = {
      name,
      isoCode,
      isActive,
      isDefault,
    };

    const response = await fetch(
      country
        ? `/api/admin/countries/${country.id}`
        : "/api/admin/countries",
      {
        method: country ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert("Failed to save country.");
      return;
    }

    router.push("/admin/countries");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Country Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Indonesia"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>


      {/* ISO Code */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          ISO Code
        </label>

        <input
          value={isoCode}
          onChange={(e) =>
            setIsoCode(
              e.target.value.toUpperCase()
            )
          }
          placeholder="ID"
          maxLength={3}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />

        <p className="mt-1 text-xs text-slate-500">
          Example: ID, MY, SG, JP
        </p>
      </div>


      {/* Active */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(e.target.checked)
          }
          className="h-4 w-4"
        />

        <span>
          Active Country
        </span>
      </label>


      {/* Default */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) =>
            setIsDefault(e.target.checked)
          }
          className="h-4 w-4"
        />

        <span>
          Default Country
        </span>
      </label>


      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Country"}
        </button>


        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-300 px-5 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}