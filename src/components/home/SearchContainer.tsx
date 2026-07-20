"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  Search,
  Users,
  CalendarDays,
  MapPin,
  X,
} from "lucide-react";

export default function SearchContainer() {
  const [destination, setDestination] = useState("");

  const [range, setRange] = useState<DateRange>();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const dateLabel =
    range?.from && range?.to
      ? `${format(range.from, "dd MMM")} - ${format(
          range.to,
          "dd MMM"
        )}`
      : "Add dates";

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block w-full max-w-5xl">
        <div className="bg-white border border-gray-200 rounded-full shadow-lg">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_auto] items-center">

            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-gray-500"
                />

                <input
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                  placeholder="Where are you going?"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            <div className="border-l border-gray-100">
              <button
                onClick={() => {
                  setCalendarOpen(true);
                  setGuestOpen(false);
                }}
                className="w-full px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={18}
                    className="text-gray-500"
                  />
                  <span className="text-sm">
                    {dateLabel}
                  </span>
                </div>
              </button>
            </div>

            <div className="border-l border-gray-100">
              <button
                onClick={() => {
                  setGuestOpen(!guestOpen);
                  setCalendarOpen(false);
                }}
                className="w-full px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <Users
                    size={18}
                    className="text-gray-500"
                  />
                  <span className="text-sm">
                    {adults + children} guests · {rooms} room
                  </span>
                </div>
              </button>

              {guestOpen && (
                <GuestDropdown
                  adults={adults}
                  children={children}
                  rooms={rooms}
                  setAdults={setAdults}
                  setChildren={setChildren}
                  setRooms={setRooms}
                />
              )}
            </div>

            <div className="p-2">
              <button className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">

          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin
                size={18}
                className="text-gray-500"
              />

              <input
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
                placeholder="Where are you going?"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => setCalendarOpen(true)}
            className="w-full p-4 border-b border-gray-200 text-left"
          >
            <div className="flex items-center gap-3">
              <CalendarDays
                size={18}
                className="text-gray-500"
              />

              <span>{dateLabel}</span>
            </div>
          </button>

          <button
            onClick={() => setGuestOpen(true)}
            className="w-full p-4 border-b border-gray-200 text-left"
          >
            <div className="flex items-center gap-3">
              <Users
                size={18}
                className="text-gray-500"
              />

              <span>
                {adults + children} guests · {rooms} room
              </span>
            </div>
          </button>

          <div className="p-4">
            <button className="w-full h-12 rounded-2xl bg-black text-white flex items-center justify-center gap-2">
              <Search size={18} />
              Search
            </button>
          </div>

        </div>
      </div>

      {/* Calendar Modal */}
      {calendarOpen && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-semibold">
              Select dates
            </h3>

            <button
              onClick={() =>
                setCalendarOpen(false)
              }
            >
              <X size={22} />
            </button>
          </div>

          <div className="p-6 flex justify-center">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={
                typeof window !== "undefined" &&
                window.innerWidth >= 768
                  ? 2
                  : 1
              }
              defaultMonth={new Date()}
              pagedNavigation
              animate
            />
          </div>
        </div>
      )}

      {/* Guest Bottom Sheet Mobile */}
      {guestOpen && (
        <div className="md:hidden fixed inset-0 z-[9999] bg-black/30">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Guests
              </h3>

              <button
                onClick={() =>
                  setGuestOpen(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <GuestCounter
              label="Adults"
              value={adults}
              onMinus={() =>
                setAdults(Math.max(1, adults - 1))
              }
              onPlus={() =>
                setAdults(adults + 1)
              }
            />

            <GuestCounter
              label="Children"
              value={children}
              onMinus={() =>
                setChildren(
                  Math.max(0, children - 1)
                )
              }
              onPlus={() =>
                setChildren(children + 1)
              }
            />

            <GuestCounter
              label="Rooms"
              value={rooms}
              onMinus={() =>
                setRooms(Math.max(1, rooms - 1))
              }
              onPlus={() =>
                setRooms(rooms + 1)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

function GuestDropdown({
  adults,
  children,
  rooms,
  setAdults,
  setChildren,
  setRooms,
}: any) {
  return (
    <div className="absolute top-full right-0 mt-3 w-80 bg-white border rounded-3xl shadow-xl p-4 z-50">
      <GuestCounter
        label="Adults"
        value={adults}
        onMinus={() =>
          setAdults(Math.max(1, adults - 1))
        }
        onPlus={() =>
          setAdults(adults + 1)
        }
      />

      <GuestCounter
        label="Children"
        value={children}
        onMinus={() =>
          setChildren(Math.max(0, children - 1))
        }
        onPlus={() =>
          setChildren(children + 1)
        }
      />

      <GuestCounter
        label="Rooms"
        value={rooms}
        onMinus={() =>
          setRooms(Math.max(1, rooms - 1))
        }
        onPlus={() =>
          setRooms(rooms + 1)
        }
      />
    </div>
  );
}

function GuestCounter({
  label,
  value,
  onMinus,
  onPlus,
}: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-0">
      <span>{label}</span>

      <div className="flex items-center gap-3">
        <button
          onClick={onMinus}
          className="w-8 h-8 border rounded-full"
        >
          -
        </button>

        <span>{value}</span>

        <button
          onClick={onPlus}
          className="w-8 h-8 border rounded-full"
        >
          +
        </button>
      </div>
    </div>
  );
}