import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import slugify from "slugify"

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params

    const body = await req.json()

    const attraction =
      await prisma.attraction.update({
        where: {
          id,
        },

        data: {
          name: body.name,

          slug: slugify(body.name, {
            lower: true,
            strict: true,
          }),

          description:
            body.description || null,

          cityId: Number(body.cityId),

          latitude:
            body.latitude !== null
              ? Number(body.latitude)
              : null,

          longitude:
            body.longitude !== null
              ? Number(body.longitude)
              : null,
        },
      })

    return NextResponse.json(
      attraction
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message:
          "Failed to update attraction",
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
  try {
    const { id } = await params

    await prisma.attraction.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message:
          "Failed to delete attraction",
      },
      {
        status: 500,
      }
    )
  }
}