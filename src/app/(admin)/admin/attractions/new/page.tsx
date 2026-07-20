import { prisma } from "@/lib/prisma"
import AttractionForm from "@/components/admin/AttractionForm"

export default async function NewAttractionPage() {
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
        countries={countries}
        provinces={provinces}
        cities={cities}
      />
    </div>
  )
}