import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { status } = await req.json()

  const hotel = await prisma.hotel.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })

  return Response.json(hotel)
}