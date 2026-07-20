import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;

  const city = await prisma.city.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      state: {
        include: {
          country: true,
        },
      },
    },
  });

  if (!city) {
    return NextResponse.json(
      {
        error: "City not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(city);
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const city = await prisma.city.update({
      where: {
        id: Number(id),
      },
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
        error: "Failed to update city.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.city.delete({
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
        error: "Failed to delete city.",
      },
      {
        status: 500,
      }
    );
  }
}