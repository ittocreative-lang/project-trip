import { prisma } from "@/lib/prisma"

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

  const amenity =
    await prisma.amenity.update({
      where: {
        id,
      },

      data: {
        name: body.name,
        slug: body.slug,
        icon: body.icon || null,

        categoryId:
          body.categoryId,

        isPopular:
          body.isPopular ?? false,
      },
    })

  return Response.json(amenity)
}

export async function DELETE(
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

  await prisma.amenity.delete({
    where: {
      id,
    },
  })

  return Response.json({
    success: true,
  })
}