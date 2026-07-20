import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import slugify from "slugify"

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(
  req: Request,
  { params }: Props
) {
  const { id } = await params

  try {
    const body = await req.json()

    const category =
      await prisma.amenityCategory.update({
        where: {
          id,
        },
        data: {
          name: body.name,
          slug: slugify(body.name, {
            lower: true,
            strict: true,
          }),
          sortOrder:
            body.sortOrder || 0,
        },
      })

    return NextResponse.json(category)
  } catch {
    return NextResponse.json(
      {
        error: "Gagal update",
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  const { id } = await params

  try {
    await prisma.amenityCategory.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch {
    return NextResponse.json(
      {
        error: "Gagal hapus",
      },
      {
        status: 500,
      }
    )
  }
}