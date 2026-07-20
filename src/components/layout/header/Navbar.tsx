import Link from "next/link";

interface NavbarProps {
  locale: string;
}

export default function Navbar({
  locale,
}: NavbarProps) {
  const links = [
    {
      href: `/${locale}/hotels`,
      label: "Hotels",
    },
    {
      href: `/${locale}/locations`,
      label: "Destinations",
    },
    {
      href: `/${locale}/articles`,
      label: "Travel Guides",
    },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="
  relative
  text-sm
  font-medium
  text-gray-600
  hover:text-black
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-black
  after:transition-all
  hover:after:w-full
"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}