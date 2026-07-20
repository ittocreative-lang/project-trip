"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  country?: {
    id: number;
    name: string;
    isoCode: string;
    locale: string | null;
    language: string | null;
    currency: string | null;
    isActive: boolean;
    isDefault: boolean;
  };

  languages: {
    id: number;
    code: string;
    locale: string;
    nativeName: string;
  }[];
};

export default function CountryForm({
  country,
  languages,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(
    country?.name ?? ""
  );

  const [isoCode, setIsoCode] = useState(
    country?.isoCode ?? ""
  );

  const [locale, setLocale] = useState(
    country?.locale ?? ""
  );

  const [language, setLanguage] = useState(
    country?.language ?? ""
  );

  const [currency, setCurrency] = useState(
    country?.currency ?? ""
  );

  const [isActive, setIsActive] = useState(
    country?.isActive ?? true
  );

  const [isDefault, setIsDefault] = useState(
    country?.isDefault ?? false
  );

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      country
        ? `/api/admin/countries/${country.id}`
        : "/api/admin/countries",
      {
        method: country ? "PATCH" : "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          isoCode,
          locale,
          language,
          currency,
          isActive,
          isDefault,
        }),
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

  function selectLanguage(
    value: string
  ) {
    const lang = languages.find(
      (l) => l.locale === value
    );

    setLocale(value);

    if (lang) {
      setLanguage(lang.code);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      {/* Country */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Country Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Indonesia"
          required
        />
      </div>

      {/* ISO */}
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase"
          placeholder="ID"
          maxLength={2}
          required
        />
      </div>

      {/* Language */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Default Language
        </label>

        <select
          value={locale}
          onChange={(e) =>
            selectLanguage(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">
            Select language
          </option>

          {languages.map((lang) => (
            <option
              key={lang.id}
              value={lang.locale}
            >
              {lang.nativeName} (
              {lang.locale})
            </option>
          ))}
        </select>
      </div>

      {/* Currency */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Currency
        </label>

        <input
          value={currency}
          onChange={(e) =>
            setCurrency(
              e.target.value.toUpperCase()
            )
          }
          className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase"
          placeholder="IDR"
        />
      </div>

      {/* Active */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(
              e.target.checked
            )
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
            setIsDefault(
              e.target.checked
            )
          }
        />

        <span>Default Country</span>
      </label>

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