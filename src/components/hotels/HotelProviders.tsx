"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";

type Props = {
  providers: {
    id: string;
    affiliateUrl: string;
    price: number | null;
    currency: string;
    provider: {
      id: string;
      name: string;
      logo: string | null;
    };
  }[];
};

export default function HotelProviders({ providers }: Props) {
  if (!providers?.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 md:text-xl">
            Booking Options
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare prices from trusted providers
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <ShieldCheck className="h-4 w-4" />
          Verified deals
        </div>
      </div>

      {/* PROVIDERS */}
      <div className="mt-5 space-y-3">
        {providers.map((item) => {
          const redirectUrl = `/redirect/${item.provider.id}?url=${encodeURIComponent(
            item.affiliateUrl
          )}`;

          return (
            <a
              key={item.id}
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-slate-50"
            >
              {/* TOP */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {item.provider.logo ? (
                    <img
                      src={item.provider.logo}
                      alt={item.provider.name}
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded bg-slate-100" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {item.provider.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    Official partner
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Price per night
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
                    {item.price
                      ? `${item.currency} ${item.price.toLocaleString()}`
                      : "-"}
                  </p>
                </div>

                <div className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700">
                  View Deal
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}