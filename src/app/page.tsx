import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect ke default locale (id)
  redirect("/en")
}