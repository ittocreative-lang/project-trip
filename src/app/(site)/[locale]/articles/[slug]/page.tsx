import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { parseContent } from "@/lib/content"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const article = await prisma.article.findUnique({
    where: { slug },
  })

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      
      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
        <span>{new Date(article.createdAt).toLocaleDateString("id-ID")}</span>
        <span>{article.tags?.join(", ")}</span>
      </div>

      {/* Thumbnail */}
      {article.thumbnail && (
        <img 
          src={article.thumbnail} 
          alt={article.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* ✅ Content dengan link aktif! */}
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: parseContent(article.content) }} 
      />
    </article>
  )
}