"use server";

import { cookies } from "next/headers";

export async function saveLocaleSettings({
  language,
  currency,
}: {
  language: string;
  currency: string;
}) {
  const cookieStore = await cookies();

  cookieStore.set("language", language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  cookieStore.set("currency", currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return {
    success: true,
  };
}