"use client"

import { useState } from "react"

type Props = {
  description?: string | null
  phone?: string | null
  officialSite?: string | null
  address?: string | null
}

export default function HotelAbout({
  description,
  phone,
  officialSite,
  address,
}: Props) {
  const [open, setOpen] = useState(false)

  const hasExtraInfo = Boolean(phone || officialSite || address)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-xl font-semibold text-slate-900">
        About this hotel
      </h2>

      <p className="mt-4 leading-7 text-slate-600">
        {description || "No description available."}
      </p>

      {hasExtraInfo && (
        <>
          {/* COLLAPSE FIX (NO hidden/block) */}
          <div
            className={`mt-6 space-y-3 text-sm overflow-hidden transition-all duration-300 ${
              open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {address && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Address</span>
                <span className="text-right text-slate-700">
                  {address}
                </span>
              </div>
            )}

            {phone && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Phone</span>
                <a
                  href={`tel:${phone}`}
                  className="text-blue-600"
                >
                  {phone}
                </a>
              </div>
            )}

            {officialSite && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Website</span>
                <a
                  href={officialSite}
                  target="_blank"
                  className="text-blue-600"
                >
                  Visit site
                </a>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              console.log("toggle clicked")
              setOpen((v) => !v)
            }}
            className="mt-5 text-sm font-medium text-blue-600 active:scale-95"
          >
            {open ? "Show less" : "Show more info"}
          </button>
        </>
      )}
    </section>
  )
}