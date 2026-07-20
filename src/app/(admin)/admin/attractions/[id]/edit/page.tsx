import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AttractionForm from "@/components/admin/AttractionForm"

export default async function EditAttractionPage({ params }: { params: { id: string } }) {
  const attraction = await prisma.attraction.findUnique({
    where: { id: params.id },
  })

  if (!attraction) {
    notFound()
  }

  // Ambil data dari database
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
  })

  const provinces = await prisma.state.findMany({
    orderBy: { name: "asc" },
  })

  const cities = await prisma.city.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-6">
      <AttractionForm 
        attraction={attraction}
        countries={countries}
        provinces={provinces}
        cities={cities}
      />
    </div>
  )
}