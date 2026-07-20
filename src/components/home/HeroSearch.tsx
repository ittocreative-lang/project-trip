"use client"

import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { useLocale } from "next-intl"

import type { DateRange } from "react-day-picker"

import SearchContainer from "@/components/search/SearchContainer"
import SearchDesktop from "@/components/search/SearchDesktop"
import SearchMobile from "@/components/search/SearchMobile"

import DatePickerField from "@/components/search/DatePickerField"
import GuestField from "@/components/search/GuestField"

import DatePickerPopover from "@/components/search/DatePickerPopover"
import DatePickerDialog from "@/components/search/DatePickerDialog"

import GuestPopover from "@/components/search/GuestPopover"
import GuestDialog from "@/components/search/GuestDialog"

export default function HeroSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locale = useLocale()

  const dateRef = useRef<HTMLDivElement>(null)
  const guestRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  const [destination, setDestination] = useState("")
  const [range, setRange] = useState<DateRange>()

  const [calendarOpen, setCalendarOpen] =
    useState(false)

  const [guestOpen, setGuestOpen] =
    useState(false)

  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  })

  /* ===================================== */
  /* LOAD QUERY PARAMS */
  /* ===================================== */
  useEffect(() => {
    const q = searchParams.get("q") || ""

    const adults =
      Number(searchParams.get("adults")) || 2

    const children =
      Number(searchParams.get("children")) || 0

    const rooms =
      Number(searchParams.get("rooms")) || 1

    const checkIn =
      searchParams.get("checkIn")

    const checkOut =
      searchParams.get("checkOut")

    setDestination(q)

    setGuests({
      adults,
      children,
      rooms,
    })

    if (checkIn) {
      setRange({
        from: new Date(checkIn),
        to: checkOut
          ? new Date(checkOut)
          : undefined,
      })
    }
  }, [searchParams])

  /* ===================================== */
  /* MOBILE DETECT */
  /* ===================================== */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [])

  /* ===================================== */
  /* CLICK OUTSIDE */
  /* ===================================== */
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target = event.target as Node

      if (
        dateRef.current &&
        !dateRef.current.contains(target)
      ) {
        setCalendarOpen(false)
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(target)
      ) {
        setGuestOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }
  }, [])

  /* ===================================== */
  /* SEARCH */
  /* ===================================== */
  const handleSearch = () => {
    const params = new URLSearchParams()

    if (destination.trim()) {
      params.set("q", destination)
    }

    if (range?.from) {
      params.set(
        "checkIn",
        range.from.toISOString()
      )
    }

    if (range?.to) {
      params.set(
        "checkOut",
        range.to.toISOString()
      )
    }

    params.set(
      "adults",
      String(guests.adults)
    )

    params.set(
      "children",
      String(guests.children)
    )

    params.set(
      "rooms",
      String(guests.rooms)
    )

    // ✅ FIX LOCALE ROUTING
    const targetPath = pathname.includes("/hotels")
      ? pathname
      : `/${locale}/hotels`

    router.push(
      `${targetPath}?${params.toString()}`
    )
  }

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4 py-10 md:py-16">

        {/* HERO TEXT ONLY ON HOMEPAGE */}
        {!pathname.includes("/hotels") && (
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Find Your Perfect Hotel
            </h1>

            <p className="mt-4 text-muted-foreground md:text-lg">
              Compare prices from multiple providers
              and book the best stay.
            </p>
          </div>
        )}

        <div
          className={`mx-auto max-w-6xl ${
            pathname.includes("/hotels")
              ? "mt-0"
              : "mt-10"
          }`}
        >
          <SearchContainer>

            {/* ================= DESKTOP ================= */}
            <SearchDesktop>

              {/* DESTINATION */}
              <input
                type="text"
                placeholder="Hotel, city, destination..."
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
                className="h-12 min-w-[280px] flex-1 rounded-lg border px-4 outline-none"
              />

              {/* DATE */}
              <div
                ref={dateRef}
                className="relative"
              >
                <DatePickerField
                  range={range}
                  setCalendarOpen={(open) => {
                    setGuestOpen(false)
                    setCalendarOpen(open)
                  }}
                />

                {!isMobile && (
                  <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2">
                    <DatePickerPopover
                      open={calendarOpen}
                      onOpenChange={
                        setCalendarOpen
                      }
                      range={range}
                      setRange={setRange}
                    />
                  </div>
                )}
              </div>

              {/* GUEST */}
              <div
                ref={guestRef}
                className="relative"
              >
                <GuestField
                  guests={guests}
                  setGuestOpen={(open) => {
                    setCalendarOpen(false)
                    setGuestOpen(open)
                  }}
                />

                {!isMobile && (
                  <div className="absolute right-0 top-full z-50 mt-2">
                    <GuestPopover
                      open={guestOpen}
                      guests={guests}
                      setGuests={setGuests}
                    />
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-12 items-center gap-2 rounded-lg bg-blue-600 px-6 font-medium text-white transition hover:bg-blue-700"
              >
                <Search size={18} />
                Search
              </button>
            </SearchDesktop>

            {/* ================= MOBILE ================= */}
            <SearchMobile>

              {/* DESTINATION */}
              <input
                type="text"
                placeholder="Hotel, city, destination..."
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
                className="h-12 w-full rounded-lg border px-4 outline-none"
              />

              {/* DATE */}
              <DatePickerField
                range={range}
                setCalendarOpen={(open) => {
                  setGuestOpen(false)
                  setCalendarOpen(open)
                }}
              />

              {/* GUEST */}
              <GuestField
                guests={guests}
                setGuestOpen={(open) => {
                  setCalendarOpen(false)
                  setGuestOpen(open)
                }}
              />

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 font-medium text-white transition hover:bg-blue-700"
              >
                <Search size={18} />
                Search
              </button>
            </SearchMobile>
          </SearchContainer>
        </div>
      </div>

      {/* ================= MOBILE DIALOGS ================= */}
      {isMobile && (
        <>
          <DatePickerDialog
            open={calendarOpen}
            onOpenChange={setCalendarOpen}
            range={range}
            setRange={setRange}
          />

          <GuestDialog
            open={guestOpen}
            onOpenChange={setGuestOpen}
            guests={guests}
            setGuests={setGuests}
          />
        </>
      )}
    </section>
  )
}