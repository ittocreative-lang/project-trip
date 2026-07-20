// app/api/locations/states/route.ts
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const countryId = Number(searchParams.get("countryId"))

  if (!countryId) {
    return Response.json([])
  }

  const states = await prisma.state.findMany({
    where: { countryId },
    orderBy: { name: "asc" }
  })

  return Response.json(states)
}