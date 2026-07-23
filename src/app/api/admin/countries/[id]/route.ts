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

  const country = await prisma.country.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!country) {
    return NextResponse.json(
      {
        message: "Country not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(country);
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
      await prisma.country.updateMany({
        data: {
          isDefault: false,
        },
      });
    }


    const country = await prisma.country.update({
      where: {
        id: Number(id),
      },

      data: {
        name: body.name,

        isoCode: body.isoCode.toUpperCase(),

        isActive: body.isActive,

        isDefault: body.isDefault,
      },
    });


    return NextResponse.json(country);


  } catch (error) {

    console.error(error);


    return NextResponse.json(
      {
        message: "Failed to update country",
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


    await prisma.country.delete({
      where:{
        id:Number(id),
      },
    });


    return NextResponse.json({
      success:true,
    });


  } catch(error){

    console.error(error);


    return NextResponse.json(
      {
        message:"Failed to delete country",
      },
      {
        status:500,
      }
    );
  }
}