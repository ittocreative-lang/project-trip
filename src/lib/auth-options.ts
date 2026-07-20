import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import { ROLES } from "./role"
import { compare } from "bcryptjs"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) {
          throw new Error("User tidak ditemukan")
        }

        if (!user.role || user.role < ROLES.STAFF) {
          throw new Error("Akun ini tidak memiliki akses admin")
        }

        if (!user.password) {
          throw new Error("Password belum diatur")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Password salah")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id
      token.role = user.role ?? ROLES.USER
    }

    if (!token.role) {
      token.role = ROLES.USER
    }

    return token
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string
      session.user.role = (token.role as number) ?? ROLES.USER
    }

    return session
  },

  // 🔥 ADD INI
async redirect({ baseUrl, url }) {
  return url.startsWith(baseUrl)
    ? url
    : `${baseUrl}/admin/dashboard`
}
},

  pages: {
    signIn: "/admin-login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: true,
}