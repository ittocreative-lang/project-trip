import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
      imageId: string;
    }>;
  }
) {
  try {
    const { imageId } = await params;


    const image = await prisma.hotelImage.findUnique({
      where: {
        id: imageId,
      },
    });


    if (!image) {
      return NextResponse.json(
        {
          error: "Image not found",
        },
        {
          status: 404,
        }
      );
    }


    // nanti bisa hapus R2 pakai image.key


    await prisma.hotelImage.delete({
      where: {
        id: imageId,
      },
    });


    return NextResponse.json({
      success: true,
    });


  } catch (error) {

    console.error(
      "DELETE HOTEL IMAGE ERROR",
      error
    );


    return NextResponse.json(
      {
        error: "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}