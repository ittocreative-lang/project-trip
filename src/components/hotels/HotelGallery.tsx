"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  images: {
    id: string
    url: string
  }[]

  hotelName?: string
}

export default function HotelGallery({
  images,
  hotelName = "Hotel",
}: Props) {
  const [current, setCurrent] = useState(0)

  if (!images?.length) {
    return (
      <div className="flex h-[250px] items-center justify-center rounded-2xl bg-gray-100 sm:h-[400px]">
        No Image
      </div>
    )
  }

  function nextSlide() {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  function prevSlide() {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <section>
      {/* ================= MOBILE SLIDER ================= */}
      <div className="relative md:hidden">
        <img
          src={images[current].url}
          alt={hotelName}
          className="h-64 w-full rounded-2xl object-cover"
        />

        <div className="absolute inset-0 rounded-2xl bg-black/10" />

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>


        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-5 bg-white"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>


      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden grid-cols-4 gap-4 md:grid">

        {/* MAIN IMAGE */}
        <div className="col-span-2 row-span-2">
          <img
            src={images[0].url}
            alt={hotelName}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>


        {/* SIDE IMAGES */}
        {images.slice(1, 5).map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={hotelName}
            className="h-[180px] w-full rounded-2xl object-cover"
          />
        ))}

      </div>
    </section>
  )
}