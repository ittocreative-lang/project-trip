import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ArticleForm from "@/components/admin/ArticleForm"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id },
  })

  if (!article) {
    notFound()
  }

  // ✅ Load countries dari database
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-6">
      {/* ✅ Pass article DAN countries ke form */}
      <ArticleForm article={article} countries={countries} />
    </div>
  )
}