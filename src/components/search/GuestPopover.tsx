"use client"

import Counter from "./Counter"

interface Props {
  open: boolean
  guests: {
    adults: number
    children: number
    rooms: number
  }
  setGuests: (value: any) => void
}

export default function GuestPopover({
  open,
  guests,
  setGuests,
}: Props) {
  if (!open) return null

  return (
    <div className="w-[320px] rounded-2xl border bg-white p-4 shadow-xl">
      <h3 className="mb-4 font-semibold">
        Guests & Rooms
      </h3>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span>Adults</span>

          <Counter
            value={guests.adults}
            min={1}
            onChange={(value) =>
              setGuests({
                ...guests,
                adults: value,
              })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Children</span>

          <Counter
            value={guests.children}
            onChange={(value) =>
              setGuests({
                ...guests,
                children: value,
              })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Rooms</span>

          <Counter
            value={guests.rooms}
            min={1}
            onChange={(value) =>
              setGuests({
                ...guests,
                rooms: value,
              })
            }
          />
        </div>
      </div>
    </div>
  )
}