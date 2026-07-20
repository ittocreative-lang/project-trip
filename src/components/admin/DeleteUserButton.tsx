"use client"

export default function DeleteUserButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Hapus ${name}? Tindakan ini tidak bisa dibatalkan.`)) return

    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
    if (res.ok) {
      window.location.reload()
    } else {
      alert("Gagal menghapus user")
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline text-sm">
      Hapus
    </button>
  )
}