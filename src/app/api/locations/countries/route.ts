// app/api/locations/countries/route.ts
import { prisma } from "@/lib/prisma"

export async function GET() {
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" }
  })

  return Response.json(countries)
}