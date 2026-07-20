"use client"

import { Button } from "@/components/ui/button"

interface CounterProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export default function Counter({
  value,
  onChange,
  min = 0,
  max = 20,
}: CounterProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        -
      </Button>

      <span className="w-8 text-center">{value}</span>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </Button>
    </div>
  )
}