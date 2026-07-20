import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(countries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.isDefault) {
      await prisma.country.updateMany({
        data: {
          isDefault: false,
        },
      });
    }

    const country = await prisma.country.create({
      data: {
        name: body.name,
        isoCode: body.isoCode.toUpperCase(),

        locale: body.locale || null,
        language: body.language || null,
        currency: body.currency || null,

        isActive: body.isActive,
        isDefault: body.isDefault,
      },
    });

    return NextResponse.json(country);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create country",
      },
      {
        status: 500,
      }
    );
  }
}