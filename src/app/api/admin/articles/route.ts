import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role < 50) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, slug, excerpt, content, thumbnail, tags, published, countryId } = body

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Title, slug, excerpt, dan content wajib diisi" }, { status: 400 })
    }

    const existing = await prisma.article.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: "Slug sudah ada" }, { status: 400 })
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        thumbnail: thumbnail || null,
        tags: tags || [],
        published: published ?? false,
        countryId: countryId || null,
        authorId: session.user.id,  // ← dari session login
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}