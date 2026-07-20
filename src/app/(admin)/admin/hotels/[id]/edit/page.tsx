import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditHotelForm from "@/components/admin/EditHotelForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  })

  if (!hotel) notFound()

  const cities = await prisma.city.findMany({
    orderBy: { name: "asc" },
    include: { state: { include: { country: true } } },
  })

  return <EditHotelForm hotel={hotel} cities={cities} />
}