import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import NewHotelForm from "@/components/admin/NewHotelForm"

export default async function NewHotelPage() {
const session = await getServerSession(authOptions)

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