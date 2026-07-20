import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;

    const marketId = Number(id);

    if (Number.isNaN(marketId)) {
      return NextResponse.json(
        {
          error: "Invalid market id",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const countryIds: number[] = body.countryIds ?? [];

    const market = await prisma.market.findUnique({
      where: {
        id: marketId,
      },
    });

    if (!market) {
      return NextResponse.json(
        {
          error: "Market not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.$transaction([
      prisma.marketCountry.deleteMany({
        where: {
          marketId,
        },
      }),

      prisma.marketCountry.createMany({
        data: countryIds.map((countryId) => ({
          marketId,
          countryId,
        })),
        skipDuplicates: true,
      }),
    ]);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}