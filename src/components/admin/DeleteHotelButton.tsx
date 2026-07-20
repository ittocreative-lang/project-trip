"use client"

export default function DeleteHotelButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  async function handleDelete() {
    if (!confirm(`Hapus hotel ${name}? Tindakan ini tidak bisa dibatalkan.`)) {
      return
    }

    const res = await fetch(`/api/admin/hotels/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      window.location.reload()
    } else {
      alert("Gagal menghapus hotel")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:underline text-sm"
    >
      Hapus
    </button>
  )
}