// app/api/locations/cities/route.ts
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const stateId = Number(searchParams.get("stateId"))

  if (!stateId) {
    return Response.json([])
  }

  const cities = await prisma.city.findMany({
    where: { stateId },
    orderBy: { name: "asc" },
    include: {
      state: true, // OPTIONAL saja
    },
  })

  return Response.json(cities)
}