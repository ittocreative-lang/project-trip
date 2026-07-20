"use client"

import { useRouter } from "next/navigation"
import { ROLES } from "@/lib/role"

interface UserFormProps {
  user?: {
    id: string
    name: string | null
    email: string
    role: number
  }
}

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const isEdit = !!user

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: parseInt(formData.get("role") as string),
    }

    const url = isEdit 
      ? `/api/admin/users/${user.id}`
      : "/api/admin/users"
    
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push("/admin/users")
      router.refresh()
    } else {
      const err = await res.json()
      alert(err.error || "Failed to save")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? "Edit User" : "Add User"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isEdit ? "Update user details" : "Add a new user"}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            type="text"
            defaultValue={user?.name || ""}
            placeholder="Enter user name"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={user?.email || ""}
            placeholder="user@example.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password {isEdit && <span className="text-slate-400">(kosongkan jika tidak ingin mengubah)</span>}
          </label>
          <input
            name="password"
            type="password"
            placeholder={isEdit ? "••••••••" : "Enter password"}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
            minLength={isEdit ? 0 : 8}
            required={!isEdit}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select
            name="role"
            defaultValue={user?.role || ROLES.USER}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.STAFF}>Staff</option>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.SUPERADMIN}>Superadmin</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          {isEdit ? "Save Changes" : "Add User"}
        </button>
        
        <button
          type="button"
          onClick={() => router.push("/admin/users")}
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}