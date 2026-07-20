"use client";

import { Check } from "lucide-react";

export type LanguageItem = {
  id: number;
  code: string;
  locale: string;
  name: string;
  nativeName: string;
};

interface Props {
  language: LanguageItem;
  selected?: string;
  onSelect: (language: LanguageItem) => void;
}

export default function LanguageCard({
  language,
  selected,
  onSelect,
}: Props) {
  const active =
    selected === language.code;

  return (
    <button
      type="button"
      onClick={() => onSelect(language)}
      className={`
        relative
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition
        ${
          active
            ? "border-blue-600 bg-blue-50"
            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
        }
      `}
    >
      {active && (
        <Check
          size={18}
          className="absolute right-4 top-4 text-blue-600"
        />
      )}

      <div className="font-medium">
        {language.nativeName}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {language.name}
      </div>
    </button>
  );
}