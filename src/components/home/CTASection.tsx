import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-3xl font-bold">
          List Your Hotel With Us
        </h2>

        <p className="text-gray-300 mt-2">
          Reach thousands of travelers every day
        </p>

        <Link
          href="/dashboard/hotels/new"
          className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-xl"
        >
          Add Hotel
        </Link>

      </div>
    </section>
  )
}