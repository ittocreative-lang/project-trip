import { NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { r2 } from "@/lib/r2"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  try {
    // 🔥 AMBIL ID DARI URL MANUAL (PALING STABIL)
    const url = new URL(req.url)
    const parts = url.pathname.split("/")
    const hotelId = parts[parts.indexOf("hotels") + 1]

    console.log("HOTEL ID:", hotelId)

    if (!hotelId || hotelId === "images") {
      return NextResponse.json(
        { error: "hotelId missing" },
        { status: 400 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "File required" },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const key = `hotels/${hotelId}/${randomUUID()}.jpg`

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const urlImage = `${process.env.R2_PUBLIC_URL}/${key}`

    const image = await prisma.hotelImage.create({
      data: {
        hotelId,
        url: urlImage,
        key,
      },
    })

    return NextResponse.json(image)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    )
  }
}