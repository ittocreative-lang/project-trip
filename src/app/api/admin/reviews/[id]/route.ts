import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { hasRole, ROLES } from "@/lib/role"

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session || !hasRole(session.user.role, ROLES.STAFF)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { id } = await params

  await prisma.review.delete({
    where: {
      id,
    },
  })

  return NextResponse.json({
    success: true,
  })
}