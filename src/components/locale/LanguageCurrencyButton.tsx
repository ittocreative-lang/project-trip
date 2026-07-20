"use client";

import { Globe } from "lucide-react";

interface Props {
  language?: {
    nativeName: string;
  };

  currency?: string;

  onClick: () => void;
}

export default function LanguageCurrencyButton({
  language,
  currency,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        h-10
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        px-3
        transition
        hover:bg-slate-100
      "
    >
      <Globe size={18} />

      <span className="hidden text-sm sm:block">
        {language?.nativeName ?? "English"} ·{" "}
        {currency ?? "USD"}
      </span>
    </button>
  );
}