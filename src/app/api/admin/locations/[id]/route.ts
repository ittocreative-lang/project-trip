// app/api/admin/locations/[id]/route.ts

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
  try {
    const { id } = await params

    const body = await req.json()

    const countryId = parseInt(id)

    if (
      !body.countryName ||
      !body.isoCode
    ) {
      return NextResponse.json(
        {
          error: "Data tidak lengkap",
        },
        {
          status: 400,
        }
      )
    }

    // update country
    await prisma.country.update({
      where: {
        id: countryId,
      },

      data: {
        name: body.countryName,
        isoCode: body.isoCode.toUpperCase(),
      },
    })

    // delete old cities
    await prisma.city.deleteMany({
      where: {
        countryId,
      },
    })

    // recreate cities
    if (
      Array.isArray(body.cities) &&
      body.cities.length > 0
    ) {
      await prisma.city.createMany({
        data: body.cities.map((city: any) => ({
          name: city.name,
          slug: city.slug,

          countryId,
        })),
      })
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    )
  }
}