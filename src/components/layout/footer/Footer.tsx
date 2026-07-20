import Link from "next/link"

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Trip</h3>
            <p className="text-slate-400 text-sm">
              Find your perfect hotel & destination across Southeast Asia
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <div className="space-y-2">
              <Link href={`/${locale}/hotels`} className="block text-slate-400 hover:text-white text-sm">
                Hotels
              </Link>
              <Link href={`/${locale}/locations`} className="block text-slate-400 hover:text-white text-sm">
                Locations
              </Link>
              <Link href={`/${locale}/articles`} className="block text-slate-400 hover:text-white text-sm">
                Articles
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <div className="space-y-2">
              <Link href={`/${locale}/about`} className="block text-slate-400 hover:text-white text-sm">
                About
              </Link>
              <Link href={`/${locale}/contact`} className="block text-slate-400 hover:text-white text-sm">
                Contact
              </Link>
              <Link href={`/${locale}/privacy`} className="block text-slate-400 hover:text-white text-sm">
                Privacy
              </Link>
            </div>
          </div>

          {/* Language */}
          <div>
            <h4 className="font-bold mb-4">Language</h4>
            <div className="space-y-2">
              <Link href="/id" className="block text-slate-400 hover:text-white text-sm">
                🇮🇩 Indonesia
              </Link>
              <Link href="/en" className="block text-slate-400 hover:text-white text-sm">
                🇬🇧 English
              </Link>
              <Link href="/ms" className="block text-slate-400 hover:text-white text-sm">
                🇲🇾 Melayu
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          © {currentYear} Trip. All rights reserved.
        </div>
      </div>
    </footer>
  )
}