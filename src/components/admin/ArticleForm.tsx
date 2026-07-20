"use client"

import { useRouter } from "next/navigation"
import { Link as LinkIcon, ExternalLink } from "lucide-react"

interface ArticleFormProps {
  article?: {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    thumbnail: string | null
    tags: string[]
    published: boolean
    countryId: number | null
  }
  countries?: { id: number; name: string }[]
}

export default function ArticleForm({ article, countries = [] }: ArticleFormProps) {
  const router = useRouter()
  const isEdit = !!article

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      thumbnail: formData.get("thumbnail") || null,
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
      published: formData.get("published") === "on",
      countryId: formData.get("countryId") ? parseInt(formData.get("countryId") as string) : null,
    }

    const url = isEdit 
      ? `/api/admin/articles/${article.id}`
      : "/api/admin/articles"
    
    const method = isEdit ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json().catch(() => ({ error: "Unknown error" }))

      if (!res.ok) {
        alert(result.error || "Failed to save")
        return
      }

      router.push("/admin/articles")
      router.refresh()
    } catch (error) {
      alert("Terjadi kesalahan")
    }
  }

  // ✅ Insert internal link
  function insertLink(type: string, value: string) {
    const contentField = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement
    if (!contentField) return

    const linkText = `[${type}:${value}]`
    const start = contentField.selectionStart
    const end = contentField.selectionEnd
    const text = contentField.value
    
    // Insert at cursor position
    contentField.value = text.substring(0, start) + linkText + text.substring(end)
    contentField.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? "Edit Article" : "Add Article"}
        </h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input name="title" type="text" defaultValue={article?.title || ""} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" required />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Slug</label>
          <input name="slug" type="text" defaultValue={article?.slug || ""} placeholder="article-slug" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" required />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Country</label>
          <select name="countryId" defaultValue={article?.countryId || ""} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3">
            <option value="">Select Country (Optional)</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Excerpt</label>
          <textarea name="excerpt" rows={3} defaultValue={article?.excerpt || ""} className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" required />
        </div>

        {/* Content with Link Buttons */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Content</label>
          
          {/* ✅ Link Insertion Buttons */}
          <div className="flex flex-wrap gap-2 mb-2">
            <button type="button" onClick={() => insertLink("hotel", "slug")} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg">
              <LinkIcon size={12} /> Hotel
            </button>
            <button type="button" onClick={() => insertLink("location", "slug")} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg">
              <LinkIcon size={12} /> Location
            </button>
            <button type="button" onClick={() => insertLink("article", "slug")} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg">
              <LinkIcon size={12} /> Article
            </button>
            <button type="button" onClick={() => insertLink("url", "https://")} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg">
              <ExternalLink size={12} /> External
            </button>
          </div>

          <textarea 
            name="content" 
            rows={10} 
            defaultValue={article?.content || ""} 
            placeholder="Write content... Use buttons above to insert links"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm"
            required 
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Thumbnail URL</label>
          <input name="thumbnail" type="url" defaultValue={article?.thumbnail || ""} placeholder="https://example.com/image.jpg" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Tags</label>
          <input name="tags" type="text" defaultValue={article?.tags?.join(", ") || ""} placeholder="hotel, bali, beach" className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3" />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input name="published" type="checkbox" defaultChecked={article?.published ?? false} className="w-4 h-4" />
          <label className="text-sm text-slate-700">Publish article</label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {isEdit ? "Save Changes" : "Add Article"}
        </button>
        <a href="/admin/articles" className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
          Cancel
        </a>
      </div>
    </form>
  )
}