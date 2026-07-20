import { ReactNode } from "react"

export default function SearchMobile({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {children}
    </div>
  )
}