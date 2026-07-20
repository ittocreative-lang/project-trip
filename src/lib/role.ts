// Role utilities

export const ROLES = {
  USER: 10,
  STAFF: 20,
  ADMIN: 50,
  SUPERADMIN: 100,
} as const

export type RoleLevel = typeof ROLES[keyof typeof ROLES]

// Check if user has required role
export function hasRole(userRole: number, requiredRole: number): boolean {
  return userRole >= requiredRole
}

// Get role name
export function getRoleName(role: number): string {
  const roleNames: Record<number, string> = {
    10: "User",
    20: "Staff",
    50: "Admin",
    100: "Superadmin",
  }
  
  return roleNames[role] || "User"
}

// Get role label (for display)
export function getRoleLabel(role: number): string {
  switch (role) {
    case ROLES.SUPERADMIN:
      return "Superadmin"
    case ROLES.ADMIN:
      return "Admin"
    case ROLES.STAFF:
      return "Staff"
    default:
      return "User"
  }
}

// Get role color (for badges)
export function getRoleColor(role: number): {
  bg: string
  text: string
} {
  switch (role) {
    case ROLES.SUPERADMIN:
      return { bg: "bg-red-100", text: "text-red-600" }
    case ROLES.ADMIN:
      return { bg: "bg-orange-100", text: "text-orange-600" }
    case ROLES.STAFF:
      return { bg: "bg-blue-100", text: "text-blue-600" }
    default:
      return { bg: "bg-slate-100", text: "text-slate-600" }
  }
}

// TypeScript extension for next-auth
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: number
      image?: string
    }
  }
  
  interface User {
    role: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: number
    id: string
  }
}

// Export semua
export default {
  ROLES,
  hasRole,
  getRoleName,
  getRoleLabel,
  getRoleColor,
}