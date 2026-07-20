import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import HotelPricingForm from "@/components/admin/HotelPricingForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function HotelPricingPage({ params }: Props) {
  const { id } = await params

  const hotel = await prisma.hotel.findUnique({
    where: { id },
  })

  if (!hotel) notFound()

  const providers = await prisma.provider.findMany({
    orderBy: { name: "asc" },
  })

  const hotelProviders = await prisma.hotelProvider.findMany({
    where: { hotelId: id },
  })

  return (
    <HotelPricingForm
      hotelId={id}
      providers={providers}
      hotelProviders={hotelProviders}
    />
  )
}