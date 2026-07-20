"use client"

import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface Props {
  open: boolean
  range?: DateRange
  setRange: (range: DateRange | undefined) => void
  onOpenChange: (open: boolean) => void
}

export default function DatePickerDialog({
  open,
  range,
  setRange,
  onOpenChange,
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
          Select dates
        </h3>

        <Calendar
          mode="range"
          numberOfMonths={1}
          selected={range}
          onSelect={(value) => {
            setRange(value)

            if (value?.from && value?.to) {
              onOpenChange(false)
            }
          }}
        />
      </div>
    </>
  )
}