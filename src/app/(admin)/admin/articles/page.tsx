import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import DeleteArticleButton from "@/components/admin/DeleteArticleButton"

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  })

  // Ambil country names manual
  const countries = await prisma.country.findMany()
  const countryMap = new Map(countries.map(c => [c.id, c.name]))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Articles</h1>
          <p className="text-sm text-slate-500 mt-1">{articles.length} articles</p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Country</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-slate-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400">
                  No articles found
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{article.title}</td>
                  <td className="px-4 py-3">
                    {article.countryId && countryMap.has(article.countryId) ? (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {countryMap.get(article.countryId)}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">/{article.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      article.published 
                        ? "bg-green-100 text-green-600" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(article.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/admin/articles/${article.id}`} 
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteArticleButton id={article.id} title={article.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}