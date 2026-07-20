"use client"

import Counter from "./Counter"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  guests: {
    adults: number
    children: number
    rooms: number
  }
  setGuests: (value: any) => void
}

export default function GuestDialog({
  open,
  onOpenChange,
  guests,
  setGuests,
}: Props) {
  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/40"
        onClick={() => onOpenChange(false)}
      />

      <div className="fixed inset-x-0 bottom-0 z-[101] rounded-t-3xl bg-white p-5 shadow-2xl">
        <h3 className="mb-4 text-lg font-semibold">
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
    </>
  )
}