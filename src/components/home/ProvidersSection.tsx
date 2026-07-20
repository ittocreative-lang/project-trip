import Image from "next/image"

const providers = [
  {
    name: "Agoda",
    logo: "/providers/agoda.png",
  },
  {
    name: "Booking.com",
    logo: "/providers/bookingcom.png",
  },
  {
    name: "Traveloka",
    logo: "/providers/expedia.png",
  },
  {
    name: "Tiket.com",
    logo: "/providers/klook.png",
  },
  {
    name: "Expedia",
    logo: "/providers/tripcom.png",
  },
  {
    name: "Hotels.com",
    logo: "/providers/marriott.png",
  },
]

export default function ProvidersSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-0">

<div className="grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-6">
  {providers.map((provider) => (
    <div
      key={provider.name}
      className="
        flex
        h-14 md:h-20
        items-center
        justify-center
        rounded-xl
        border
        bg-white
        px-3
        transition
        hover:shadow-sm
      "
    >
      <Image
        src={provider.logo}
        alt={provider.name}
        width={120}
        height={40}
        className="
          max-h-6 md:max-h-8
          w-auto
          object-contain
        "
      />
    </div>
  ))}
</div>
    </section>
  )
}