"use client"

import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"

interface Props {
  range?: DateRange
  setCalendarOpen: (open: boolean) => void
}

export default function DatePickerField({
  range,
  setCalendarOpen,
}: Props) {
  const label =
    range?.from && range?.to
      ? `${format(range.from, "dd MMM")} - ${format(
          range.to,
          "dd MMM yyyy"
        )}`
      : "Check in - Check out"

  return (
    <Button
      variant="outline"
      className="justify-start"
      onClick={() => setCalendarOpen(true)}
    >
      <CalendarDays className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}