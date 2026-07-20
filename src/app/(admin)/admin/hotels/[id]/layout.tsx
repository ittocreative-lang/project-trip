"use client"

import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { Settings, Star, Image, MapPin, DollarSign } from "lucide-react"

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string

  const menus = [
    { label: "Basic", href: `/admin/hotels/${id}`, icon: Settings },
    { label: "Amenities", href: `/admin/hotels/${id}/amenities`, icon: Star },
    { label: "Images", href: `/admin/hotels/${id}/images`, icon: Image },
    { label: "Nearby", href: `/admin/hotels/${id}/attractions`, icon: MapPin },
    { label: "Pricing", href: `/admin/hotels/${id}/pricing`, icon: DollarSign },
  ]

  return (
    <div className="p-6 space-y-4">
      {/* MENU TABS */}
      <div className="rounded-xl border border-slate-200 bg-white p-2">
        <div className="flex flex-wrap gap-1">
          {menus.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* CONTENT */}
      {children}
    </div>
  )
}