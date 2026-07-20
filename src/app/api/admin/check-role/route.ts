import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { hasRole, ROLES } from "@/lib/role"

export async function GET() {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({
      isAuthenticated: false,
    })
  }

  const role = session.user.role ?? 0

  return NextResponse.json({
    isAuthenticated: true,
    role,
    canAccessAdmin: hasRole(role, ROLES.STAFF),
    isStaff: role === ROLES.STAFF,
    isAdmin: hasRole(role, ROLES.ADMIN),
  })
}