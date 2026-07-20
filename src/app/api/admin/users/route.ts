import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { ROLES } from "@/lib/role"

export async function POST(request: Request) {
const session = await getServerSession(authOptions)

  if (!session || session.user.role < ROLES.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, password wajib diisi" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}