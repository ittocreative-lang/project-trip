import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditAmenityForm from "./EditAmenityForm"

export default async function EditAmenityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const amenity = await prisma.amenity.findUnique({
    where: { id },
  })

  if (!amenity) {
    notFound()
  }

  const categories =
    await prisma.amenityCategory.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    })

  return (
    <EditAmenityForm
      amenity={amenity}
      categories={categories}
    />
  )
}