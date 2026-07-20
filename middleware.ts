import createMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"
import { NextRequest, NextResponse } from "next/server"

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ✅ BYPASS STATIC + API + AUTH
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin-login") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // ❗ HANDLE ADMIN (support locale)
  if (pathname.includes("/admin")) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
}