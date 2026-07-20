import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ROLES } from "@/lib/role"

import Link from "next/link"

import {
  Hotel,
  Users,
  Star,
  FileText,
  Plus,
  ArrowRight,
} from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/admin-login")
  }

  const userRole = session.user.role ?? 0

  // STAFF sudah boleh masuk dashboard
  if (userRole < ROLES.STAFF) {
    redirect("/admin-login")
  }

  const getRoleName = (role: number) => {
    const labels: Record<number, string> = {
      10: "User",
      20: "Staff",
      50: "Admin",
      100: "Superadmin",
    }

    return labels[role] || "User"
  }

  const [hotelCount, userCount, reviewCount, articleCount] =
    await Promise.all([
      prisma.hotel.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.article.count(),
    ])

  const recentHotels = await prisma.hotel.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { city: true },
  })

  const recentReviews = await prisma.review.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      hotel: true,
    },
  })

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Selamat datang,
          <span className="ml-1 font-medium text-blue-600">
            {session.user.name || "Admin"}
          </span>
        </p>

        <div className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {getRoleName(userRole)}
        </div>
      </div>

      {/* lanjutkan JSX dashboard yang sudah ada */}
    </div>
  )
}