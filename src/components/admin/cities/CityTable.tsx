"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import DeleteCityButton from "./DeleteCityButton";

type City = {
  id: number;
  name: string;
  slug: string;

  state: {
    id: number;
    name: string;

    country: {
      id: number;
      name: string;
    };
  };
};

interface Props {
  cities: City[];
}

export default function CityTable({
  cities,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <table className="w-full">

        <thead className="bg-slate-50">
          <tr className="text-left">

            <th className="px-6 py-4 font-semibold">
              City
            </th>

            <th className="px-6 py-4 font-semibold">
              State
            </th>

            <th className="px-6 py-4 font-semibold">
              Country
            </th>

            <th className="px-6 py-4 font-semibold">
              Slug
            </th>

            <th className="w-44 px-6 py-4 font-semibold">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {cities.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-10 text-center text-slate-500"
              >
                No cities found.
              </td>
            </tr>
          )}

          {cities.map((city) => (
            <tr
              key={city.id}
              className="border-t border-slate-100"
            >
              <td className="px-6 py-4 font-medium">
                {city.name}
              </td>

              <td className="px-6 py-4">
                {city.state.name}
              </td>

              <td className="px-6 py-4">
                {city.state.country.name}
              </td>

              <td className="px-6 py-4 text-slate-500">
                {city.slug}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2">

                  <Link
                    href={`/admin/cities/${city.id}`}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2
                      text-sm
                      hover:bg-slate-50
                    "
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <DeleteCityButton
                    id={city.id}
                    name={city.name}
                  />

                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}