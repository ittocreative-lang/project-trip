import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request
) {
  const body = await req.json()

  const amenity =
    await prisma.amenity.create({
      data: {
        name: body.name,
        slug: body.slug,
        icon: body.icon || null,

        categoryId:
          body.categoryId,

        isPopular:
          body.isPopular ??
          false,
      },
    })

  return Response.json(
    amenity
  )
}