"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40"
      />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-[9999] flex items-end justify-center md:items-center md:p-4">
        <div
          className="
            w-full
            md:max-w-md
            bg-white
            rounded-t-3xl
            md:rounded-3xl
            shadow-2xl
            animate-in
            slide-in-from-bottom
            md:zoom-in-95
            duration-200
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold">
              Sign In
            </h2>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <button
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-gray-200
                transition
                hover:bg-gray-50
              "
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

            <div className="relative my-5">
              <div className="border-t" />

              <span
                className="
                  absolute
                  left-1/2
                  -top-3
                  -translate-x-1/2
                  bg-white
                  px-3
                  text-sm
                  text-gray-500
                "
              >
                or
              </span>
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="
                mb-3
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
              "
            />

            <input
              type="password"
              placeholder="Password"
              className="
                mb-4
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
              "
            />

            <button
              className="
                h-12
                w-full
                rounded-xl
                bg-black
                font-medium
                text-white
                hover:bg-gray-900
              "
            >
              Continue
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button className="font-medium text-black">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}