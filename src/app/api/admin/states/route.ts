import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const states = await prisma.state.findMany({
    include: {
      country: true,
      _count: {
        select: {
          cities: true,
        },
      },
    },
    orderBy: [
      {
        country: {
          name: "asc",
        },
      },
      {
        name: "asc",
      },
    ],
  });

  return NextResponse.json(states);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const state = await prisma.state.create({
      data: {
        name: body.name,
        isoCode: body.isoCode.toUpperCase(),
        countryId: Number(body.countryId),
      },
    });

    return NextResponse.json(state);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create state",
      },
      {
        status: 500,
      }
    );
  }
}