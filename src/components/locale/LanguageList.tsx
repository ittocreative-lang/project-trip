"use client";

import LanguageCard, {
  LanguageItem,
} from "./LanguageCard";

interface Props {
  languages: LanguageItem[];

  selected?: string;

  onSelect: (
    language: LanguageItem
  ) => void;
}

export default function LanguageList({
  languages,
  selected,
  onSelect,
}: Props) {
  if (!languages.length) {
    return (
      <div className="rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-500">
        No languages found.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {languages.map((language) => (
        <LanguageCard
          key={language.id}
          language={language}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}