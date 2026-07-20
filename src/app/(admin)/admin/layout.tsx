import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ROLES, hasRole, getRoleName } from "@/lib/role"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  console.log("SESSION:", session)

  // 🔒 must have session
  if (!session?.user?.id) {
    redirect("/admin-login")
  }

if (!session?.user) {
  redirect("/admin-login")
}

const role = session.user.role ?? 0

  // 🔒 staff minimal access
  if (!hasRole(role, ROLES.STAFF)) {
    redirect("/admin-login")
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar role={role} />

      <div className="flex-1 lg:ml-72">
        <AdminHeader
          title="Admin Panel"
          role={getRoleName(role)}
        />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}