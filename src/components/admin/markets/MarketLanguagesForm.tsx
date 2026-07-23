"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  marketId: number;

  languages: {
    id: number;
    code: string;
    locale: string;
    nativeName: string;
  }[];

  selectedLanguageIds: number[];
};

export default function MarketLanguagesForm({
  marketId,
  languages,
  selectedLanguageIds,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<number[]>(
    selectedLanguageIds
  );

  function toggleLanguage(id: number) {
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
      `/api/admin/markets/${marketId}/languages`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageIds: selected,
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert("Failed to save languages.");
      return;
    }

    router.refresh();

    alert("Languages updated.");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Languages
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the languages available in this
          market.
        </p>
      </div>

      <div className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-3">
        {languages.map((language) => {
          const checked = selected.includes(
            language.id
          );

          return (
            <label
              key={language.id}
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
                  toggleLanguage(language.id)
                }
                className="h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-900">
                  {language.nativeName}
                </p>

                <p className="text-sm text-slate-500">
                  {language.locale}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 p-6">
        <p className="text-sm text-slate-500">
          {selected.length} languages selected
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
            {loading
              ? "Saving..."
              : "Save Languages"}
          </button>
        </div>
      </div>
    </form>
  );
}