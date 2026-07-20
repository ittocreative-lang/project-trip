import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";

import { getLocaleSettings } from "@/lib/locale";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = {
    Home: {
      latestHotels: "Hotel Terbaru",
    },
  };

  const settings = await getLocaleSettings();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <div className="flex min-h-screen flex-col">

        <Header
          locale={locale}
          languages={settings.languages}
          currencies={settings.currencies}
          currentLanguage={settings.language}
          currentCurrency={settings.currency}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer locale={locale} />

      </div>
    </NextIntlClientProvider>
  );
}