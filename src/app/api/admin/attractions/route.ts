import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import slugify from "slugify"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const attraction =
      await prisma.attraction.create({
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

    return NextResponse.json(attraction)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        message:
          "Failed to create attraction",
      },
      {
        status: 500,
      }
    )
  }
}