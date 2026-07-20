import { ReactNode } from "react"

export default function SearchDesktop({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="hidden md:flex items-center gap-4">
      {children}
    </div>
  )
}