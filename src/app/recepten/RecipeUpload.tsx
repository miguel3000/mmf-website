"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function RecipeUpload() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
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
    if (!open) return;

    if (window.turnstile) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.onload = () => renderWidget();
    document.head.appendChild(script);
  }, [open, renderWidget]);

  useEffect(() => {
    if (!open && widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = "";
      setToken("");
    }
  }, [open]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setErrorMsg("");
    }
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file || !token) return;

    if (file.size > 4.5 * 1024 * 1024) {
      setErrorMsg("Bestand te groot (max 4.5MB)");
      return;
    }

    setStatus("uploading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("token", token);

      const res = await fetch("/api/recipe-upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setFileName("");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Uploaden mislukt");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Uploaden mislukt");
      setStatus("error");
    }

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setToken("");
    }
  }

  if (!open) {
    return (
      <p className="mt-2 text-muted dark:text-white/30 text-xs">
        Recept dat je graag wil toevoegen?{" "}
        <button
          onClick={() => setOpen(true)}
          className="underline hover:text-secondary dark:hover:text-white/50 transition-colors"
        >
          Upload een duidelijke foto
        </button>
      </p>
    );
  }

  if (status === "success") {
    return (
      <div className="mt-3 p-4 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-surface-dark max-w-sm mx-auto">
        <p className="text-primary dark:text-white/90 text-sm">
          Bedankt! De foto is verstuurd.
        </p>
        <button
          onClick={() => { setOpen(false); setStatus("idle"); }}
          className="mt-2 text-xs text-muted dark:text-white/30 underline"
        >
          Sluiten
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 p-4 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-surface-dark max-w-sm mx-auto">
      <p className="text-secondary dark:text-white/50 text-xs mb-3">
        Upload een duidelijke foto van het recept
      </p>

      <label className="flex items-center gap-2 cursor-pointer text-sm text-primary dark:text-white/90 border border-border dark:border-border-dark rounded-lg px-3 py-2 hover:border-secondary dark:hover:border-white/40 transition-colors">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="truncate">{fileName || "Kies een foto..."}</span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="mt-3" ref={turnstileRef} />

      {errorMsg && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-xs">{errorMsg}</p>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!fileName || !token || status === "uploading"}
          className="bg-primary dark:bg-white text-white dark:text-bg-dark text-xs tracking-wider px-4 py-2 rounded-lg hover:bg-secondary dark:hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "Versturen..." : "Verstuur"}
        </button>
        <button
          onClick={() => { setOpen(false); setStatus("idle"); setFileName(""); setErrorMsg(""); }}
          className="text-xs text-muted dark:text-white/30 underline"
        >
          Annuleren
        </button>
      </div>
    </div>
  );
}
