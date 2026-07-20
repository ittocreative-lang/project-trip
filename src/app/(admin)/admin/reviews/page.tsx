import { prisma } from "@/lib/prisma"

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, hotel: true },
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ulasan</h1>
        <p className="text-sm text-gray-500 mt-1">{reviews.length} ulasan</p>
      </div>

      <div className="space-y-3">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-12 text-center text-gray-400">
            Belum ada ulasan
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{review.user.name}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-gray-500">{review.hotel.name}</span>
                    <span className="text-yellow-400 text-sm">{"★".repeat(review.rating)}</span>
                  </div>
                  <p className="font-medium text-sm">{review.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{review.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
                <DeleteReviewButton id={review.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function DeleteReviewButton({ id }: { id: string }) {
  return (
    <button
      className="text-xs text-red-500 hover:underline flex-shrink-0"
      onClick={() => {
        if (confirm("Hapus ulasan ini?")) {
          fetch(`/api/admin/reviews/${id}`, { method: "DELETE" })
            .then(() => window.location.reload())
        }
      }}
    >
      Hapus
    </button>
  )
}