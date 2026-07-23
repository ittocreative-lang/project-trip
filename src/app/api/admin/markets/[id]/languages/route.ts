import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    console.log("MARKET ID:", id);
    console.log("BODY:", body);


    const marketId = Number(id);

    const languageIds = body.languageIds;


    if (!Array.isArray(languageIds)) {
      return NextResponse.json(
        {
          error: "languageIds harus array",
        },
        {
          status: 400,
        }
      );
    }


    await prisma.marketLanguage.deleteMany({
      where: {
        marketId,
      },
    });


    if (languageIds.length > 0) {
      await prisma.marketLanguage.createMany({
        data: languageIds.map(
          (languageId:number)=>({
            marketId,
            languageId,
          })
        ),
      });
    }


    return NextResponse.json({
      success:true,
    });


  } catch(error){

    console.error(
      "ERROR SAVE MARKET LANGUAGE",
      error
    );


    return NextResponse.json(
      {
        error:String(error),
      },
      {
        status:500,
      }
    );
  }
}