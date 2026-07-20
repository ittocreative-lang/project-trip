import Link from "next/link";

interface LogoProps {
  locale: string;
}

export default function Logo({
  locale,
}: LogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center gap-2"
    >
      <div className="h-8 w-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
        T
      </div>

      <span className="font-semibold text-lg tracking-tight">
        Trip
      </span>
    </Link>
  );
}