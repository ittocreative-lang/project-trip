// app/admin/locations/[id]/page.tsx

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

import EditLocationForm from "./EditLocationsForm"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditLocationPage({
  params,
}: Props) {
  const { id } = await params

  const country = await prisma.country.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      states: {
        orderBy: {
          name: "asc",
        },

        include: {
          cities: {
            orderBy: {
              name: "asc",
            },
          },
        },
      },
    },
  })

  if (!country) {
    notFound()
  }

  return (
    <EditLocationForm country={country} />
  )
}