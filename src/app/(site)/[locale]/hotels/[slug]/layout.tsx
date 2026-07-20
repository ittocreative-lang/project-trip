import React from "react"

export default function HotelSlugLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}