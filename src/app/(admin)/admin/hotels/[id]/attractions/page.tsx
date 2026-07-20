import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import HotelAttractionsForm from "@/components/admin/HotelAttractionsForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelAttractionsPage({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: {
      attractions: {
        include: {
          attraction: true,
        },
      },
    },
  })

  if (!hotel) notFound()

  const attractions = await prisma.attraction.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <HotelAttractionsForm
      hotelId={hotel.id}
      attractions={attractions}
      selectedAttractions={hotel.attractions.map((item) => ({
        attractionId: item.attractionId,
        name: item.attraction.name,
      }))}
    />
  )
}