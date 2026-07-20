import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import slugify from "slugify"

export async function GET() {
  const categories =
    await prisma.amenityCategory.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    })

  return NextResponse.json(categories)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.name) {
      return NextResponse.json(
        {
          error: "Nama kategori wajib diisi",
        },
        {
          status: 400,
        }
      )
    }

    const slug = slugify(body.name, {
      lower: true,
      strict: true,
      trim: true,
    })

    const exists =
      await prisma.amenityCategory.findUnique({
        where: {
          slug,
        },
      })

    if (exists) {
      return NextResponse.json(
        {
          error: "Kategori sudah ada",
        },
        {
          status: 400,
        }
      )
    }

    const category =
      await prisma.amenityCategory.create({
        data: {
          name: body.name,
          slug,
          sortOrder: body.sortOrder || 0,
        },
      })

    return NextResponse.json(category)
  } catch {
    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    )
  }
}