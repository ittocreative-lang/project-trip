import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()

    if (!body.name) {
      return Response.json(
        {
          error: "Name required",
        },
        {
          status: 400,
        }
      )
    }

    const provider =
      await prisma.provider.create({
        data: {
          name: body.name,
          slug: body.slug,
          logo: body.logo || null,
        },
      })

    return Response.json(provider)
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error: "Failed to create provider",
      },
      {
        status: 500,
      }
    )
  }
}