"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: "nl" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="fixed top-7 right-20 z-50 flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchLocale("nl")}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === "nl"
            ? "text-primary"
            : "text-muted hover:text-secondary"
        }`}
        aria-label="Nederlands"
      >
        NL
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === "en"
            ? "text-primary"
            : "text-muted hover:text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
