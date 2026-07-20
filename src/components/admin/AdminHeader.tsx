"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Bell,
  User,
  ExternalLink,
  LogOut,
} from "lucide-react"

interface AdminHeaderProps {
  title: string
  role?: string
}

export default function AdminHeader({
  title,
  role = "Admin",
}: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/admin-login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
<h1 className="pl-12 text-xl font-semibold text-slate-900 lg:pl-0">
  {title}
</h1>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 hover:bg-slate-200"
          >
            <ExternalLink size={16} />
            Website
          </Link>

          <button className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <User size={16} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Role
              </p>

              <p className="text-sm font-medium text-slate-700">
                {role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl p-2 text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}