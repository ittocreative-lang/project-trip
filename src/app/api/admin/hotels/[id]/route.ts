import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { hasRole, ROLES } from "@/lib/role"
import slugify from "slugify"

interface RouteProps {
params: Promise<{
id: string
}>
}

export async function PUT(
req: Request,
{ params }: RouteProps
) {
try {
const session = await auth()


if (
  !session?.user ||
  !hasRole(session.user.role ?? 0, ROLES.STAFF)
) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  )
}

const role = session.user.role ?? 0

const { id } = await params
const body = await req.json()

const slug =
  body.slug?.trim()
    ? slugify(body.slug, {
        lower: true,
        strict: true,
        trim: true,
      })
    : slugify(body.name, {
        lower: true,
        strict: true,
        trim: true,
      })

const hotel = await prisma.hotel.update({
  where: {
    id,
  },

  data: {
    name: body.name,
    slug,

    cityId: Number(body.cityId),

    address: body.address || null,
    shortDescription:
      body.shortDescription || null,
    about: body.about || null,

    stars: Number(body.stars || 0),

    priceMin: body.priceMin
      ? Number(body.priceMin)
      : null,

    officialSite:
      body.officialSite || null,

    phone: body.phone || null,

    email: body.email || null,

    latitude: body.latitude
      ? Number(body.latitude)
      : null,

    longitude: body.longitude
      ? Number(body.longitude)
      : null,

    isFeatured:
      body.isFeatured ?? false,

    status:
      role >= ROLES.ADMIN
        ? body.status
        : "DRAFT",
  },
})

return NextResponse.json(hotel)


} catch (error) {
console.error(error)


return NextResponse.json(
  {
    error: "Failed to update hotel",
  },
  {
    status: 500,
  }
)


}
}

export async function DELETE(
req: Request,
{ params }: RouteProps
) {
try {
const session = await auth()


if (
  !session?.user ||
  !hasRole(session.user.role ?? 0, ROLES.ADMIN)
) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  )
}

const { id } = await params

await prisma.hotel.delete({
  where: {
    id,
  },
})

return NextResponse.json({
  success: true,
})


} catch (error) {
console.error(error)


return NextResponse.json(
  {
    error: "Failed to delete hotel",
  },
  {
    status: 500,
  }
)


}
}
