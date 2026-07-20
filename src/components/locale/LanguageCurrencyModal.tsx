"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  useRouter,
  usePathname,
} from "@/i18n/navigation";
import { saveLocaleSettings } from "@/actions/locale";

import LanguageList from "./LanguageList";
import CurrencyList from "./CurrencyList";

import type { LanguageItem } from "./LanguageCard";
import type { CurrencyItem } from "./CurrencyCard";

interface Props {
  open: boolean;
  onClose: () => void;

  languages: LanguageItem[];
  currencies: CurrencyItem[];

  currentLanguage?: string;
  currentCurrency?: string;

  onLanguageChange?: (
    language: LanguageItem
  ) => void;

  onCurrencyChange?: (
    currency: CurrencyItem
  ) => void;
}

export default function LanguageCurrencyModal({
  open,
  onClose,

  languages,
  currencies,

  currentLanguage,
  currentCurrency,

  onLanguageChange,
  onCurrencyChange,
}: Props) {
const router = useRouter();
const pathname = usePathname();

  const [language, setLanguage] =
    useState(currentLanguage);

  const [currency, setCurrency] =
    useState(currentCurrency);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    setCurrency(currentCurrency);
  }, [currentCurrency]);

async function handleSave() {
  if (!language || !currency) return;

  try {
    setSaving(true);

    await saveLocaleSettings({
      language,
      currency,
    });

    router.replace(pathname, {
      locale: language,
    });

    onClose();
  } finally {
    setSaving(false);
  }
}

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

        <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">

            <div>
              <h2 className="text-xl font-semibold">
                Language & Currency
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose your preferred language and currency.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6">

            {/* Language */}
            <section>

              <h3 className="mb-4 text-lg font-semibold">
                Language
              </h3>

              <LanguageList
                languages={languages}
                selected={language}
                onSelect={(item) => {
                  setLanguage(item.code);
                  onLanguageChange?.(item);
                }}
              />

            </section>

            {/* Currency */}
            <section className="mt-10">

              <h3 className="mb-4 text-lg font-semibold">
                Currency
              </h3>

              <CurrencyList
                currencies={currencies}
                selected={currency}
                onSelect={(item) => {
                  setCurrency(item.code);
                  onCurrencyChange?.(item);
                }}
              />

            </section>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

            <button
              onClick={onClose}
              className="
                rounded-xl
                border
                border-slate-300
                px-6
                py-3
                font-medium
                hover:bg-slate-100
              "
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving
                ? "Saving..."
                : "Save"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}