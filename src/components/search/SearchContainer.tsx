import { ReactNode } from "react"

export default function SearchContainer({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-lg">
      {children}
    </div>
  )
}