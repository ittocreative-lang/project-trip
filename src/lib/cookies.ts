import { cookies } from "next/headers";

export async function getLanguageCookie() {
  const store = await cookies();

  return (
    store.get("language")?.value ??
    "en"
  );
}

export async function getCurrencyCookie() {
  const store = await cookies();

  return (
    store.get("currency")?.value ??
    "USD"
  );
}