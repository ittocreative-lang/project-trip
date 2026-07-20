"use client"

import { useState } from "react"
import { Trash2, Star, Upload } from "lucide-react"

type ImageItem = {
  id: string
  url: string
  isFeatured: boolean
  sortOrder: number
}

interface Props {
  hotelId: string
  images: ImageItem[]
}

export default function HotelImagesForm({
  hotelId,
  images: initialImages,
}: Props) {
  const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [loading, setLoading] = useState(false)

  // 📤 UPLOAD
  const handleUpload = async (files: FileList | null) => {
    if (!files) return

    setLoading(true)

    try {
      const newImages: ImageItem[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch(
          `/api/admin/hotels/${hotelId}/images`,
          {
            method: "POST",
            body: formData,
          }
        )

        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(errorText)
        }

        const data = await res.json()

        newImages.push({
          id: data.id,
          url: data.url,
          isFeatured: false,
          sortOrder: images.length + newImages.length,
        })
      }

      setImages((prev) => [...prev, ...newImages])
    } catch (err) {
      console.error("UPLOAD ERROR:", err)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  // 🗑 DELETE (UI ONLY)
  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  // ⭐ SET FEATURED
  const handleSetFeatured = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isFeatured: img.id === id,
      }))
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Hotel Images</h2>
          <p className="text-sm text-gray-500">
            Upload and manage hotel gallery
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Upload size={16} />
          {loading ? "Uploading..." : "Upload"}

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      {/* GRID */}
      {images.length === 0 ? (
        <div className="rounded-xl border p-10 text-center text-gray-500">
          No images yet. Upload first.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-xl border bg-white"
            >
              {/* IMAGE (SAFE FOR R2) */}
              <div className="relative aspect-square">
                <img
                  src={img.url}
                  alt="hotel image"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* FEATURED */}
              {img.isFeatured && (
                <div className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
                  Featured
                </div>
              )}

              {/* ACTIONS */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => handleSetFeatured(img.id)}
                  className="rounded bg-white p-2 hover:bg-gray-100"
                >
                  <Star size={16} />
                </button>

                <button
                  onClick={() => handleDelete(img.id)}
                  className="rounded bg-white p-2 hover:bg-red-100 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INFO */}
      <div className="text-sm text-gray-500">
        Tip: first image usually becomes main thumbnail
      </div>
    </div>
  )
}