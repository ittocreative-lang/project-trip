import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function GET() {
  const cities = await prisma.city.findMany({
    include: {
      state: {
        include: {
          country: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(cities);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const city = await prisma.city.create({
      data: {
        name: body.name.trim(),
        slug:
          body.slug?.trim() ||
          slugify(body.name),
        stateId: Number(body.stateId),
      },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create city.",
      },
      {
        status: 500,
      }
    );
  }
}