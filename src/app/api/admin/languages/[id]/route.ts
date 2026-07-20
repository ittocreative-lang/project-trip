import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  const language =
    await prisma.language.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!language) {
    return NextResponse.json(
      {
        error: "Language not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(language);
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const language =
      await prisma.language.update({
        where: {
          id: Number(id),
        },
        data: {
          code: body.code.trim().toLowerCase(),
          locale: body.locale.trim(),
          name: body.name.trim(),
          nativeName: body.nativeName.trim(),
          isRTL: body.isRTL ?? false,
          isActive: body.isActive ?? true,
          isDefault: body.isDefault ?? false,
        },
      });

    if (body.isDefault) {
      await prisma.language.updateMany({
        where: {
          id: {
            not: language.id,
          },
        },
        data: {
          isDefault: false,
        },
      });
    }

    return NextResponse.json(language);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update language.",
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

    await prisma.language.delete({
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
        error: "Failed to delete language.",
      },
      {
        status: 500,
      }
    );
  }
}