"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  market?: {
    id: number;
    name: string;
    code: string;
    defaultLanguageId: number;
    defaultCurrency: string;
    domain: string | null;
    isActive: boolean;
    isDefault: boolean;
  };

  languages: {
    id: number;
    nativeName: string;
    locale: string;
  }[];
};

export default function MarketForm({
  market,
  languages,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(market?.name ?? "");
  const [code, setCode] = useState(market?.code ?? "");

  const [defaultLanguageId, setDefaultLanguageId] = useState(
    market?.defaultLanguageId?.toString() ?? ""
  );

  const [defaultCurrency, setDefaultCurrency] = useState(
    market?.defaultCurrency ?? ""
  );

  const [domain, setDomain] = useState(
    market?.domain ?? ""
  );

  const [isActive, setIsActive] = useState(
    market?.isActive ?? true
  );

  const [isDefault, setIsDefault] = useState(
    market?.isDefault ?? false
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const body = {
      name,
      code,
      defaultLanguageId: Number(defaultLanguageId),
      defaultCurrency,
      domain: domain || null,
      isActive,
      isDefault,
    };

    const response = await fetch(
      market
        ? `/api/admin/markets/${market.id}`
        : "/api/admin/markets",
      {
        method: market ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert("Failed to save market.");
      return;
    }

    router.push("/admin/markets");
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
          Market Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Indonesia"
          required
        />
      </div>

      {/* Code */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Market Code
        </label>

        <input
          value={code}
          onChange={(e) =>
            setCode(e.target.value.toLowerCase())
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="id"
          required
        />

        <p className="mt-1 text-xs text-slate-500">
          Example: id, sg, my, global
        </p>
      </div>

      {/* Default Language */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Default Language
        </label>

        <select
          value={defaultLanguageId}
          onChange={(e) =>
            setDefaultLanguageId(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          required
        >
          <option value="">
            Select language
          </option>

          {languages.map((language) => (
            <option
              key={language.id}
              value={language.id}
            >
              {language.nativeName} ({language.locale})
            </option>
          ))}
        </select>
      </div>

      {/* Currency */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Default Currency
        </label>

        <input
          value={defaultCurrency}
          onChange={(e) =>
            setDefaultCurrency(
              e.target.value.toUpperCase()
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="IDR"
          required
        />
      </div>

      {/* Domain */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Domain
        </label>

        <input
          value={domain}
          onChange={(e) =>
            setDomain(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="unggo.co.id"
        />

        <p className="mt-1 text-xs text-slate-500">
          Leave empty while developing.
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
        />

        <span>Active</span>
      </label>

      {/* Default */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) =>
            setIsDefault(e.target.checked)
          }
        />

        <span>Default Market</span>
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
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