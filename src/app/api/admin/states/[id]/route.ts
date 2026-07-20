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

  const state = await prisma.state.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      country: true,
    },
  });

  if (!state) {
    return NextResponse.json(
      {
        message: "State not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(state);
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

    const state = await prisma.state.update({
      where: {
        id: Number(id),
      },
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
        message: "Failed to update state",
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

    await prisma.state.delete({
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
        message: "Failed to delete state",
      },
      {
        status: 500,
      }
    );
  }
}