import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import HotelAmenitiesForm from "@/components/admin/HotelAmenitiesForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelAmenitiesPage({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: { amenities: true },
  })

  if (!hotel) notFound()

  const categories = await prisma.amenityCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { amenities: { orderBy: { name: "asc" } } },
  })

  return (
    <div className="p-6">
      <HotelAmenitiesForm
        hotelId={hotel.id}
        categories={categories}
        selectedAmenities={hotel.amenities.map((item) => item.amenityId)}
      />
    </div>
  )
}