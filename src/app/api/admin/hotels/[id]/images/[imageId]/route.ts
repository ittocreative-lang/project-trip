import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
{ params }: { params: Promise<{ id: string; imageId: string }> }) {
  try {
    const image = await prisma.hotelImage.findUnique({
      where: { id: params.imageId },
    })

    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // ❗ OPTIONAL: nanti kita tambah delete dari R2 pakai key

    await prisma.hotelImage.delete({
      where: { id: params.imageId },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}