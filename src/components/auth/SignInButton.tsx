"use client";

import { User } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function SignInButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        h-10
        px-4
        rounded-xl
        border
        border-gray-200
        hover:bg-gray-100
        flex
        items-center
        gap-2
        transition
      "
    >
      <User size={18} />
      <span className="hidden lg:block">
        Sign in
      </span>
    </button>
  );
}