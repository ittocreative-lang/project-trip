// app/api/admin/locations/route.ts

import { prisma } from "@/lib/prisma"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const country = await prisma.country.upsert({
      where: {
        isoCode: body.countryCode,
      },
      update: {},
      create: {
        name: body.countryName,
        isoCode: body.countryCode,
      },
    })

    const state = await prisma.state.upsert({
      where: {
        countryId_isoCode: {
          countryId: country.id,
          isoCode: body.stateCode,
        },
      },
      update: {},
      create: {
        name: body.stateName,
        isoCode: body.stateCode,
        countryId: country.id,
      },
    })

    const city = await prisma.city.create({
      data: {
        name: body.cityName,
        slug: slugify(
          `${body.cityName}-${body.stateCode}`
        ),
        stateId: state.id,
      },
    })

    return Response.json(city)
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: "Terjadi kesalahan",
      },
      {
        status: 500,
      }
    )
  }
}