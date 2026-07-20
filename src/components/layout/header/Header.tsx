"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

import SignInButton from "../../auth/SignInButton";
import AuthModal from "../../auth/AuthModal";

import LanguageCurrencyButton from "../../locale/LanguageCurrencyButton";
import LanguageCurrencyModal from "../../locale/LanguageCurrencyModal";

import type { LanguageItem } from "../../locale/LanguageCard";
import type { CurrencyItem } from "../../locale/CurrencyCard";

interface HeaderProps {
  locale: string;

  languages: LanguageItem[];
  currencies: CurrencyItem[];

  currentLanguage: string;
  currentCurrency: string;
}

export default function Header({
  locale,
  languages,
  currencies,
  currentLanguage,
  currentCurrency,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [languageOpen, setLanguageOpen] =
    useState(false);

  const [authOpen, setAuthOpen] =
    useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          {/* Left */}
          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setMenuOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <Logo locale={locale} />

          </div>

          {/* Desktop Navigation */}
          <Navbar locale={locale} />

          {/* Right */}
          <div className="flex items-center gap-2">

            <LanguageCurrencyButton
              language={languages.find(
                (item) =>
                  item.code ===
                  currentLanguage
              )}
              currency={
                currentCurrency
              }
              onClick={() =>
                setLanguageOpen(true)
              }
            />

            <SignInButton
              onClick={() =>
                setAuthOpen(true)
              }
            />

          </div>

        </div>

      </header>

      {/* Mobile Menu */}
      <MobileMenu
        locale={locale}
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      {/* Language & Currency */}
      <LanguageCurrencyModal
        open={languageOpen}
        onClose={() =>
          setLanguageOpen(false)
        }
        languages={languages}
        currencies={currencies}
        currentLanguage={
          currentLanguage
        }
        currentCurrency={
          currentCurrency
        }
      />

      {/* Auth */}
      <AuthModal
        open={authOpen}
        onClose={() =>
          setAuthOpen(false)
        }
      />
    </>
  );
}