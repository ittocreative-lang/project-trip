"use client";

import CurrencyCard, {
  CurrencyItem,
} from "./CurrencyCard";

interface Props {
  currencies: CurrencyItem[];

  selected?: string;

  onSelect: (
    currency: CurrencyItem
  ) => void;
}

export default function CurrencyList({
  currencies,
  selected,
  onSelect,
}: Props) {
  if (!currencies.length) {
    return (
      <div className="rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-500">
        No currencies found.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {currencies.map((currency) => (
        <CurrencyCard
          key={currency.code}
          currency={currency}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}