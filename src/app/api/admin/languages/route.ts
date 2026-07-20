import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const languages = await prisma.language.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(languages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const language = await prisma.language.create({
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
        error: "Failed to create language.",
      },
      {
        status: 500,
      }
    );
  }
}