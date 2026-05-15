"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();

  const navLinks = [
    { label: t("nav.home"), href: "/" as const },
    { label: t("nav.portfolio"), href: "/portfolio" as const },
    { label: t("nav.contact"), href: "/contact" as const },
    { label: t("nav.links"), href: "/links" as const },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-lg hover:bg-surface transition-colors"
        aria-label={t("common.openMenu")}
      >
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-4xl sm:text-5xl text-primary hover:text-secondary transition-colors tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
