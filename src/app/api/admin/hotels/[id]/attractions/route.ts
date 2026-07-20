import { prisma } from "@/lib/prisma"

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )

  return Number((R * c).toFixed(1))
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await params

  const body = await req.json()

  const hotel =
    await prisma.hotel.findUnique({
      where: {
        id,
      },

      select: {
        latitude: true,
        longitude: true,
      },
    })

  if (!hotel) {
    return Response.json(
      {
        message: "Hotel not found",
      },
      {
        status: 404,
      }
    )
  }

  await prisma.hotelAttraction.deleteMany(
    {
      where: {
        hotelId: id,
      },
    }
  )

  const selected =
    body.attractions.filter(
      (item: any) =>
        item.selected
    )

  for (const item of selected) {
    const attraction =
      await prisma.attraction.findUnique(
        {
          where: {
            id: item.attractionId,
          },

          select: {
            latitude: true,
            longitude: true,
          },
        }
      )

    let distanceKm: number | null =
      null

    if (
      hotel.latitude != null &&
      hotel.longitude != null &&
      attraction?.latitude != null &&
      attraction?.longitude != null
    ) {
      distanceKm =
        calculateDistance(
          hotel.latitude,
          hotel.longitude,
          attraction.latitude,
          attraction.longitude
        )
    }

    await prisma.hotelAttraction.create(
      {
        data: {
          hotelId: id,

          attractionId:
            item.attractionId,

          distanceKm,
        },
      }
    )
  }

  return Response.json({
    success: true,
  })
}