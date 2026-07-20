import { prisma } from "@/lib/prisma"

interface ProviderRow {
  providerId: string
  price: number | string | null
  affiliateUrl: string
  isAvailable: boolean
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } = await params

    const body = await req.json()

    const providers: ProviderRow[] =
      body.providers || []

    await prisma.hotelProvider.deleteMany({
      where: {
        hotelId: id,
      },
    })

    if (providers.length > 0) {
      await prisma.hotelProvider.createMany({
        data: providers.map((item) => ({
          hotelId: id,

          providerId:
            item.providerId,

          price:
            item.price !== "" &&
            item.price !== null
              ? Number(item.price)
              : null,

          affiliateUrl:
            item.affiliateUrl,

          isAvailable:
            item.isAvailable,
        })),
      })
    }

    return Response.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        error:
          "Failed to save pricing",
      },
      {
        status: 500,
      }
    )
  }
}