import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"
import slugify from "slugify"
import { HotelStatus } from "@prisma/client"

export async function POST(req: Request) {
  try {
const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    if (!body.name) {
      return NextResponse.json(
        { error: "Nama hotel wajib diisi" },
        { status: 400 }
      )
    }

    if (!body.cityId) {
      return NextResponse.json(
        { error: "City wajib dipilih" },
        { status: 400 }
      )
    }

    const slug = slugify(body.name, {
      lower: true,
      strict: true,
      trim: true,
    })

    const exists = await prisma.hotel.findUnique({
      where: { slug },
    })

    if (exists) {
      return NextResponse.json(
        { error: "Hotel dengan nama tersebut sudah ada" },
        { status: 400 }
      )
    }

    const hotel = await prisma.hotel.create({
      data: {
        name: body.name,
        slug,

        shortDescription: body.shortDescription || null,
        about: body.about || null,
        address: body.address || null,

        stars: Number(body.stars) || 3,
        rating: 0,

        priceMin: body.priceMin
          ? Number(body.priceMin)
          : null,

        officialSite: body.officialSite || null,
        phone: body.phone || null,
        email: body.email || null,

        latitude: body.latitude
          ? Number(body.latitude)
          : null,

        longitude: body.longitude
          ? Number(body.longitude)
          : null,

        isFeatured: Boolean(body.isFeatured),

        // semua hotel baru masuk draft
        status: HotelStatus.DRAFT,

        city: {
          connect: {
            id: Number(body.cityId),
          },
        },

        createdBy: {
          connect: {
            id: session.user.id,
          },
        },

        amenities: {
          create:
            body.amenityIds?.map(
              (amenityId: string) => ({
                amenityId,
              })
            ) || [],
        },
      },

      include: {
        city: true,

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    })

    return NextResponse.json(hotel)
  } catch (error: any) {
    console.error("CREATE HOTEL ERROR:", error)

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    )
  }
}