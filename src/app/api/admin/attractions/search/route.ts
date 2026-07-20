import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url)

  const q =
    searchParams.get("q") || ""

  const attractions =
    await prisma.attraction.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },

      take: 20,

      orderBy: {
        name: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    })

  return Response.json(attractions)
}