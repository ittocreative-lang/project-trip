import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import HotelImagesForm from "@/components/admin/HotelImagesForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelImagesPage({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  })

  if (!hotel) notFound()

  return (
    <HotelImagesForm
      hotelId={hotel.id}
      images={hotel.images}
    />
  )
}