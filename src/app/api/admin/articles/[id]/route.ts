import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"


export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string
    }>
  }
) {

  const session =
    await getServerSession(authOptions)


  if (
    !session ||
    session.user.role < 50
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    )
  }


  try {

    const { id } =
      await params


    const body =
      await request.json()


    const {
      title,
      slug,
      excerpt,
      content,
      thumbnail,
      tags,
      status,
      countryId,
    } = body



    const article =
      await prisma.article.update({
        where: {
          id,
        },

        data: {

          title,

          slug,

          excerpt,

          content,


          thumbnail:
            thumbnail || null,


          tags:
            tags || [],


          status:
            status || "DRAFT",


          countryId:
            countryId
              ? Number(countryId)
              : null,
        },
      })



    return NextResponse.json(article)



  } catch(error) {

    console.error(
      "UPDATE ARTICLE ERROR",
      error
    )


    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status:500,
      }
    )
  }
}