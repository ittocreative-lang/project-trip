"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Language = {
  id: number;
  code: string;
  locale: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
  isActive: boolean;
  isDefault: boolean;
};

interface Props {
  language?: Language;
}

export default function LanguageForm({
  language,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(
    language?.code ?? ""
  );

  const [locale, setLocale] = useState(
    language?.locale ?? ""
  );

  const [name, setName] = useState(
    language?.name ?? ""
  );

  const [nativeName, setNativeName] =
    useState(
      language?.nativeName ?? ""
    );

  const [isRTL, setIsRTL] = useState(
    language?.isRTL ?? false
  );

  const [isActive, setIsActive] =
    useState(
      language?.isActive ?? true
    );

  const [isDefault, setIsDefault] =
    useState(
      language?.isDefault ?? false
    );

  async function onSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      language
        ? `/api/admin/languages/${language.id}`
        : "/api/admin/languages",
      {
        method: language
          ? "PATCH"
          : "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          code,
          locale,
          name,
          nativeName,
          isRTL,
          isActive,
          isDefault,
        }),
      }
    );

    setLoading(false);

    if (!response.ok) {
      alert(
        "Failed to save language."
      );
      return;
    }

    router.push("/admin/languages");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    >
      {/* Code */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Code
        </label>

        <input
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value.toLowerCase()
            )
          }
          placeholder="en"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Locale */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Locale
        </label>

        <input
          value={locale}
          onChange={(e) =>
            setLocale(
              e.target.value
            )
          }
          placeholder="en-US"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Name
        </label>

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="English"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Native Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Native Name
        </label>

        <input
          value={nativeName}
          onChange={(e) =>
            setNativeName(
              e.target.value
            )
          }
          placeholder="English"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      {/* Options */}
      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isRTL}
            onChange={(e) =>
              setIsRTL(
                e.target.checked
              )
            }
          />

          <span>
            Right-to-left (RTL)
          </span>
        </label>

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

          <span>
            Default Language
          </span>
        </label>
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