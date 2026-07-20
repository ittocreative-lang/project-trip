import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import NewHotelForm from "@/components/admin/NewHotelForm"

export default async function NewHotelPage() {
  const session = await auth()

  const cities = await prisma.city.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      state: {
        include: {
          country: true,
        },
      },
    },
  })

  const amenities = await prisma.amenity.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="p-6">
      <NewHotelForm
        cities={cities}
        amenities={amenities}
        role={session?.user?.role ?? 0}
      />
    </div>
  )
}