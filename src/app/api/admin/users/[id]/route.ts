import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { ROLES } from "@/lib/role"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session || session.user.role < ROLES.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name dan email wajib diisi" },
        { status: 400 }
      )
    }

    const data: any = {
      name,
      email,
      role,
    }

    // 🔥 HASH PASSWORD HANYA JIKA DIISI
    if (password && password.trim() !== "") {
      data.password = await hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session || session.user.role < ROLES.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params

    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}