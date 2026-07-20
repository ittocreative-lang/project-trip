import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProviderForm from "./EditProviderForm"

export default async function EditProviderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const provider = await prisma.provider.findUnique({
    where: {
      id,
    },
  })

  if (!provider) {
    notFound()
  }

  return (
    <EditProviderForm provider={provider} />
  )
}