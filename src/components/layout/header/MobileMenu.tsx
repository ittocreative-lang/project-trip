"use client";

import Link from "next/link";
import { X } from "lucide-react";
import clsx from "clsx";

interface Props {
  locale: string;
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  locale,
  open,
  onClose,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all duration-300",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        )}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out",
          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between">
          <span className="font-semibold">
            Unggo.com
          </span>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="p-4 space-y-1">

          <Link
            href={`/${locale}/hotels`}
            className="block rounded-xl px-3 py-3 hover:bg-gray-100 transition"
          >
            Hotels
          </Link>

          <Link
            href={`/${locale}/locations`}
            className="block rounded-xl px-3 py-3 hover:bg-gray-100 transition"
          >
            Destinations
          </Link>

          <Link
            href={`/${locale}/articles`}
            className="block rounded-xl px-3 py-3 hover:bg-gray-100 transition"
          >
            Travel Guides
          </Link>

          <hr className="my-4" />

          <Link
            href={`/${locale}/login`}
            className="block rounded-xl px-3 py-3 hover:bg-gray-100 transition"
          >
            Sign In
          </Link>

        </nav>
      </aside>
    </>
  );
}