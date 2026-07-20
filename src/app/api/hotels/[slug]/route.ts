import { NextResponse } from "next/server"

import { getHotelBySlug } from "@/features/hotels/queries/getHotelBySlug"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { slug } = await params

    const hotel =
      await getHotelBySlug(slug)

    if (!hotel) {
      return NextResponse.json(
        {
          success: false,
          message: "Hotel not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}