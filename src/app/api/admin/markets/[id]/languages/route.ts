import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } = await params;

    const marketId = Number(id);


    const body = await req.json();


    const languageIds =
      body.languageIds;



    if (!Array.isArray(languageIds)) {

      return NextResponse.json(
        {
          error:
          "languageIds harus berupa array",
        },
        {
          status:400,
        }
      );

    }



    const result =
      await prisma.$transaction(
        async (tx)=>{


          // cek market ada

          const market =
            await tx.market.findUnique({
              where:{
                id:marketId,
              },
            });



          if(!market){

            throw new Error(
              "Market tidak ditemukan"
            );

          }



          // hapus bahasa lama

          await tx.marketLanguage.deleteMany({

            where:{
              marketId,
            },

          });



          // tambah bahasa baru

          if(languageIds.length > 0){

            await tx.marketLanguage.createMany({

              data:
              languageIds.map(
                (languageId:number)=>({

                  marketId,

                  languageId,

                })
              ),

            });

          }


          return true;

        }
      );



    return NextResponse.json({

      success:true,

      result,

    });



  } catch(error){


    console.error(
      "SAVE MARKET LANGUAGE ERROR",
      error
    );


    return NextResponse.json(

      {
        error:
        String(error),
      },

      {
        status:500,
      }

    );

  }

}