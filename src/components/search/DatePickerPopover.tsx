"use client"

import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface Props {
  open: boolean
  range?: DateRange
  setRange: (range: DateRange | undefined) => void
  onOpenChange: (open: boolean) => void
}

export default function DatePickerPopover({
  open,
  range,
  setRange,
  onOpenChange,
}: Props) {
  if (!open) return null

  return (
    <div
      className="
        w-[760px]
        rounded-3xl
        border
        bg-white
        p-5
        shadow-2xl
      "
    >
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={(value) => {
          setRange(value)

          if (value?.from && value?.to) {
            onOpenChange(false)
          }
        }}
        className="w-full"
        classNames={{
          months: "flex flex-row gap-8",
        }}
      />
    </div>
  )
}