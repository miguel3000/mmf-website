"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; theme?: string }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [token, setToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>("");

  const renderWidget = useCallback(() => {
    if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
      const isDark = document.documentElement.classList.contains("dark");
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        callback: (t: string) => setToken(t),
        theme: isDark ? "dark" : "light",
      });
    }
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.onload = () => renderWidget();
    document.head.appendChild(script);
  }, [renderWidget]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;

    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          token,
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setToken("");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-primary dark:text-white/90 text-lg font-medium">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-secondary dark:text-white/50 mb-1.5">
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg text-sm text-primary dark:text-white/90 bg-white dark:bg-surface-dark placeholder:text-muted dark:placeholder:text-white/30 focus:outline-none focus:border-secondary dark:focus:border-white/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-secondary dark:text-white/50 mb-1.5">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg text-sm text-primary dark:text-white/90 bg-white dark:bg-surface-dark placeholder:text-muted dark:placeholder:text-white/30 focus:outline-none focus:border-secondary dark:focus:border-white/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-secondary dark:text-white/50 mb-1.5">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg text-sm text-primary dark:text-white/90 bg-white dark:bg-surface-dark placeholder:text-muted dark:placeholder:text-white/30 focus:outline-none focus:border-secondary dark:focus:border-white/40 transition-colors resize-y"
        />
      </div>

      <div ref={turnstileRef} />

      {status === "error" && (
        <p className="text-red-600 dark:text-red-400 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !token}
        className="bg-primary dark:bg-white text-white dark:text-bg-dark font-heading text-xl tracking-wider px-8 py-3 rounded-lg hover:bg-secondary dark:hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "..." : t("submit")}
      </button>
    </form>
  );
}
