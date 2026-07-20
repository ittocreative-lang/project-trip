import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json()

  const hotel = await prisma.hotel.update({
    where: { id: params.id },
    data: { status },
  })

  return Response.json(hotel)
}