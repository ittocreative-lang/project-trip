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

  const provider =
    await prisma.provider.update({
      where: { id },

      data: {
        name: body.name,
        slug: body.slug,
        logo: body.logo,
      },
    })

  return Response.json(provider)
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

  await prisma.provider.delete({
    where: { id },
  })

  return Response.json({
    success: true,
  })
}