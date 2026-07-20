import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const hotelId = params.id
    const imageId = params.imageId

    // reset semua featured dulu
    await prisma.hotelImage.updateMany({
      where: { hotelId },
      data: { isFeatured: false },
    })

    // set selected jadi featured
    const updated = await prisma.hotelImage.update({
      where: { id: imageId },
      data: { isFeatured: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to set featured" },
      { status: 500 }
    )
  }
}