import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

  const markets =
    await prisma.market.findMany({

      include: {

        defaultLanguage: true,

        languages: {
          include:{
            language:true,
          },
        },

        countries:{
          include:{
            country:true,
          },
        },

      },

      orderBy:{
        name:"asc",
      },

    });


  return NextResponse.json(markets);

}



export async function POST(
  request: NextRequest
) {

  try {

    const body =
      await request.json();



    const market =
      await prisma.market.create({

        data:{

          name:body.name,

          code:body.code,


          defaultLanguageId:
            Number(body.defaultLanguageId),


          defaultCurrency:
            body.defaultCurrency,


          domain:
            body.domain || null,


          isActive:
            body.isActive ?? true,


          isDefault:
            body.isDefault ?? false,

        },

      });



    return NextResponse.json(
      market,
      {
        status:201,
      }
    );


  } catch(error){


    console.error(
      "CREATE MARKET ERROR",
      error
    );


    return NextResponse.json(
      {
        message:
        "Failed to create market",
      },
      {
        status:500,
      }
    );

  }

}