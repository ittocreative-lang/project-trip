"use client";

import { Check } from "lucide-react";

export type CurrencyItem = {
  code: string;
  name: string;
  symbol: string;
};

interface Props {
  currency: CurrencyItem;
  selected?: string;
  onSelect: (currency: CurrencyItem) => void;
}

export default function CurrencyCard({
  currency,
  selected,
  onSelect,
}: Props) {
  const active =
    selected === currency.code;

  return (
    <button
      type="button"
      onClick={() => onSelect(currency)}
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
        {currency.code}
      </div>

      <div className="mt-1 text-sm text-slate-500">
        {currency.symbol} · {currency.name}
      </div>
    </button>
  );
}