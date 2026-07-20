import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const market = await prisma.market.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      defaultLanguage: true,
      countries: {
        include: {
          country: true,
        },
      },
      featuredCities: {
        include: {
          city: true,
        },
      },
    },
  });

  if (!market) {
    return NextResponse.json(
      {
        message: "Market not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(market);
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    if (body.isDefault) {
      await prisma.market.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    const market = await prisma.market.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        code: body.code,
        domain: body.domain || null,

        defaultLanguageId: Number(
          body.defaultLanguageId
        ),

        defaultCurrency:
          body.defaultCurrency,

        isActive: body.isActive,
        isDefault: body.isDefault,
      },
    });

    return NextResponse.json(market);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update market",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    await prisma.market.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete market",
      },
      {
        status: 500,
      }
    );
  }
}