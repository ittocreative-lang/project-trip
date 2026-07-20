"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Hotel,
  Globe2,
  Tags,
  Newspaper,
  MessageSquare,
  Users,
  Menu,
  X,
  MapPinned,
  Settings,
  Building2,
  Map,
} from "lucide-react"

import { ROLES } from "@/lib/role"

const getRoleNumber = (
  role?: string | number
): number => {
  if (typeof role === "number") return role

  const roleMap: Record<string, number> = {
    user: ROLES.USER,
    staff: ROLES.STAFF,
    admin: ROLES.ADMIN,
    superadmin: ROLES.SUPERADMIN,
  }

  return (
    roleMap[role || "staff"] ??
    ROLES.STAFF
  )
}

const sections = [
  {
    title: "Main",
    items: [
      {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        minRole: ROLES.STAFF,
      },
    ],
  },

  {
    title: "Hotels",
    items: [
      {
        href: "/admin/hotels",
        label: "Hotels",
        icon: Hotel,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/providers",
        label: "Providers",
        icon: Building2,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/amenities",
        label: "Amenities",
        icon: Tags,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/attractions",
        label: "Attractions",
        icon: MapPinned,
        minRole: ROLES.STAFF,
      },
    ],
  },

  {
    title: "Locations",
    items: [
      {
        href: "/admin/countries",
        label: "Countries",
        icon: Globe2,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/states",
        label: "States",
        icon: Map,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/cities",
        label: "Cities",
        icon: Building2,
        minRole: ROLES.STAFF,
      },
    ],
  },

  {
    title: "Markets",
    items: [
      {
        href: "/admin/languages",
        label: "Languages",
        icon: Globe2,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/markets",
        label: "Markets",
        icon: Globe2,
        minRole: ROLES.STAFF,
      },
    ],
  },

  {
    title: "Content",
    items: [
      {
        href: "/admin/articles",
        label: "Articles",
        icon: Newspaper,
        minRole: ROLES.STAFF,
      },
      {
        href: "/admin/reviews",
        label: "Reviews",
        icon: MessageSquare,
        minRole: ROLES.STAFF,
      },
    ],
  },

  {
    title: "System",
    items: [
      {
        href: "/admin/users",
        label: "Users",
        icon: Users,
        minRole: ROLES.ADMIN,
      },
      {
        href: "/admin/settings",
        label: "Settings",
        icon: Settings,
        minRole: ROLES.ADMIN,
      },
    ],
  },
];

export default function AdminSidebar({
  role = ROLES.STAFF,
}: {
  role?: number
}) {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const userRole =
    getRoleNumber(role)

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === href
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Button */}
      {!mobileOpen && (
        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="fixed left-4 top-4 z-50 rounded-xl bg-white p-2 shadow ring-1 ring-slate-200 lg:hidden"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="relative border-b border-slate-200 p-5">
          <Link
            href="/admin/dashboard"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Building2
                  size={22}
                />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Unggo.com
                </h2>

                <p className="text-xs text-slate-500">
                  Admin Dashboard
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={() =>
              setMobileOpen(false)
            }
            className="absolute right-4 top-5 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {sections.map(
            (section) => {
              const items =
                section.items.filter(
                  (item) =>
                    userRole >=
                    item.minRole
                )

              if (!items.length)
                return null

              return (
                <div
                  key={section.title}
                  className="mb-6"
                >
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </div>

                  <div className="space-y-1">
                    {items.map(
                      (item) => {
                        const Icon =
                          item.icon

                        return (
                          <Link
                            key={
                              item.href
                            }
                            href={
                              item.href
                            }
                            onClick={() =>
                              setMobileOpen(
                                false
                              )
                            }
                            className={`
                              flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition
                              ${
                                isActive(
                                  item.href
                                )
                                  ? "bg-blue-50 font-medium text-blue-600"
                                  : "text-slate-600 hover:bg-slate-100"
                              }
                            `}
                          >
                            <Icon
                              size={
                                18
                              }
                            />

                            <span>
                              {
                                item.label
                              }
                            </span>
                          </Link>
                        )
                      }
                    )}
                  </div>
                </div>
              )
            }
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-xs font-semibold text-slate-700">
              Unggo.com
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Admin Dashboard
              v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}