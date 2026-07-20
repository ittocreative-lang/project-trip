import { prisma } from "@/lib/prisma"
import NewAmenityForm from "@/components/admin/NewAmenityForm"

export default async function Page() {
  const categories = await prisma.amenityCategory.findMany({
    orderBy: { sortOrder: "asc" },
  })

  return (
    <div className="p-6">
      <NewAmenityForm categories={categories} />
    </div>
  )
}