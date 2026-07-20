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
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
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

export async function GET(
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

  const hotel =
    await prisma.hotel.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        cityId: true,
        latitude: true,
        longitude: true,
      },
    })

  if (!hotel) {
    return Response.json([])
  }

  if (
    hotel.latitude == null ||
    hotel.longitude == null
  ) {
    return Response.json([])
  }

  const attractions =
    await prisma.attraction.findMany({
      select: {
        id: true,
        name: true,
        cityId: true,
        latitude: true,
        longitude: true,
      },
    })

  const nearest = attractions
    .filter(
      (item) =>
        item.latitude != null &&
        item.longitude != null
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      cityId: item.cityId,

      distanceKm:
        calculateDistance(
          hotel.latitude!,
          hotel.longitude!,
          item.latitude!,
          item.longitude!
        ),
    }))
    .sort(
      (a, b) =>
        a.distanceKm - b.distanceKm
    )
    .slice(0, 20)

  return Response.json(nearest)
}