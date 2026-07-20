"use client";

import Link from "next/link";
import DeleteLanguageButton from "./DeleteLanguageButton";

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
  languages: Language[];
}

export default function LanguageTable({
  languages,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Locale</th>
              <th className="px-6 py-4">Language</th>
              <th className="px-6 py-4">Native Name</th>
              <th className="px-6 py-4">RTL</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Default</th>
              <th className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {languages.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No languages found.
                </td>
              </tr>
            )}

            {languages.map((language) => (
              <tr
                key={language.id}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4 font-medium uppercase">
                  {language.code}
                </td>

                <td className="px-6 py-4">
                  {language.locale}
                </td>

                <td className="px-6 py-4">
                  {language.name}
                </td>

                <td className="px-6 py-4">
                  {language.nativeName}
                </td>

                <td className="px-6 py-4">
                  {language.isRTL ? (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                      RTL
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                      LTR
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {language.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {language.isDefault ? (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Default
                    </span>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/languages/${language.id}`}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
                    >
                      Edit
                    </Link>

                    <DeleteLanguageButton
                      id={language.id}
                      name={language.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}