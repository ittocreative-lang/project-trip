import { prisma } from "@/lib/prisma"
import ArticleForm from "@/components/admin/ArticleForm"

export default async function NewArticlePage() {
  // ✅ Load countries dari database
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-6">
      {/* ✅ Pass countries ke form */}
      <ArticleForm countries={countries} />
    </div>
  )
}