"use client"

import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  guests: {
    adults: number
    children: number
    rooms: number
  }
  setGuestOpen: (open: boolean) => void
}

export default function GuestField({
  guests,
  setGuestOpen,
}: Props) {
  return (
    <Button
      variant="outline"
      className="justify-start"
      onClick={() => setGuestOpen(true)}
    >
      <Users className="mr-2 h-4 w-4" />

      {guests.adults + guests.children} Guests,
      {" "}
      {guests.rooms} Room
    </Button>
  )
}