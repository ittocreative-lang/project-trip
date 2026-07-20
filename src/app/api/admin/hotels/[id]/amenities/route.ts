import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Props {
params: Promise<{
id: string
}>
}

export async function PUT(
req: Request,
{ params }: Props
) {
const { id } = await params

const body = await req.json()

await prisma.hotelAmenity.deleteMany({
where: {
hotelId: id,
},
})

if (
body.amenityIds &&
body.amenityIds.length > 0
) {
await prisma.hotelAmenity.createMany({
data: body.amenityIds.map(
(amenityId: string) => ({
hotelId: id,
amenityId,
})
),
})
}

return NextResponse.json({
success: true,
})
}
