import { prisma } from "@/lib/prisma"
import { getRoleLabel } from "@/lib/role"
import Link from "next/link"
import DeleteUserButton from "@/components/admin/DeleteUserButton"

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { reviews: true } } },
  })

  return (
    <div>
 <div className="mb-6">
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-sm text-gray-500 mt-1">{users.length} user terdaftar</p>
    </div>
    <Link href="/admin/users/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
      + Tambah User
    </Link>
  </div>
</div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Ulasan</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Bergabung</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  Belum ada user
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                        {user.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <span className="font-medium">{user.name ?? "—"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.role >= 40 ? "bg-red-50 text-red-600" :
                      user.role >= 30 ? "bg-orange-50 text-orange-600" :
                      user.role >= 20 ? "bg-blue-50 text-blue-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{user._count.reviews}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      <DeleteUserButton id={user.id} name={user.name ?? "user ini"} />
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