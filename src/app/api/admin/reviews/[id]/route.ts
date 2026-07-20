import { NextResponse } from "next/server"
import { auth } from "@/lib/auth-options"
import { prisma } from "@/lib/prisma"
import { isStaff } from "@/lib/roles"

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session || !isStaff(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await prisma.review.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}