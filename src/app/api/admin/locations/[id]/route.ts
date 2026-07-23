import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


interface Props {
  params: Promise<{
    id: string
  }>
}


export async function PUT(
  req: Request,
  { params }: Props
) {

  try {

    const { id } = await params

    const countryId = Number(id)

    const body = await req.json()


    if (
      !body.countryName ||
      !body.isoCode
    ) {
      return NextResponse.json(
        {
          error: "Data tidak lengkap",
        },
        {
          status:400,
        }
      )
    }



    await prisma.country.update({
      where:{
        id: countryId,
      },

      data:{
        name: body.countryName,
        isoCode: body.isoCode.toUpperCase(),
      },
    })



    /*
      Hapus city melalui state
      karena city sekarang milik state
    */

    const states =
      await prisma.state.findMany({
        where:{
          countryId,
        },

        select:{
          id:true,
        },
      })


    const stateIds =
      states.map(
        (state)=>state.id
      )



    if(stateIds.length){

      await prisma.city.deleteMany({
        where:{
          stateId:{
            in:stateIds,
          },
        },
      })

    }



    /*
      Buat city baru
      harus masuk ke state
    */

    if(
      Array.isArray(body.cities) &&
      body.cities.length > 0
    ){


      const defaultState =
        await prisma.state.findFirst({
          where:{
            countryId,
          },

          orderBy:{
            id:"asc",
          },
        })


      if(!defaultState){

        return NextResponse.json(
          {
            error:
            "Country belum memiliki state",
          },
          {
            status:400,
          }
        )

      }



      await prisma.city.createMany({

        data:
        body.cities.map(
          (city:any)=>({

            name:city.name,

            slug:city.slug,

            stateId:
              defaultState.id,

          })
        ),

      })

    }



    return NextResponse.json({
      success:true,
    })


  } catch(error){

    console.error(
      "UPDATE LOCATION ERROR",
      error
    )


    return NextResponse.json(
      {
        error:"Terjadi kesalahan server",
      },
      {
        status:500,
      }
    )

  }

}