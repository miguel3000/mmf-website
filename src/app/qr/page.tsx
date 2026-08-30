import Link from "next/link";

export default function QrPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark">
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl sm:text-6xl tracking-wider text-primary dark:text-white/90">
            SPULLEN GEVONDEN?
          </h1>
          <p className="mt-4 text-lg text-secondary dark:text-white/50">
            Super dat je de moeite neemt om te scannen! 🙏
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mb-6">
          <h2 className="font-heading text-2xl tracking-wide text-primary dark:text-white/90 mb-3">
            📷 DIT IS MIJN APPARATUUR
          </h2>
          <p className="text-secondary dark:text-white/50 text-sm leading-relaxed">
            Als je dit leest heb je waarschijnlijk iets van mij gevonden. Ik
            zou het ontzettend waarderen als je contact met mij opneemt zodat ik
            het kan ophalen. Alvast heel erg bedankt!
          </p>
        </div>

        <div className="text-center space-y-4 mb-8">
          <p className="text-primary dark:text-white/90 font-medium">
            Neem contact op:
          </p>
          <a
            href="tel:+31653117778"
            className="inline-flex items-center gap-3 bg-primary dark:bg-white text-white dark:text-bg-dark font-heading text-2xl tracking-wider px-8 py-4 rounded-full hover:bg-secondary dark:hover:bg-white/80 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            BEL OF APP 06 53 11 77 78
          </a>
          <p className="text-muted dark:text-white/30 text-sm">
            Of stuur een bericht via het{" "}
            <Link
              href="/contact"
              className="underline hover:text-primary dark:hover:text-white/60 transition-colors"
            >
              contactformulier
            </Link>
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark rounded-2xl p-6">
          <h2 className="font-heading text-2xl tracking-wide text-primary dark:text-white/90 mb-3">
            🤔 GEWOON BENIEUWD?
          </h2>
          <p className="text-secondary dark:text-white/50 text-sm leading-relaxed">
            Welkom! Ik ben Michiel, fotograaf uit Oss. Ik plak QR-codes op mijn
            apparatuur voor het geval ik iets verlies. Dank voor je interesse en
            mocht je mij een berichtje willen sturen, graag! Bekijk ook mijn{" "}
            <Link
              href="/"
              className="underline hover:text-primary dark:hover:text-white/60 transition-colors"
            >
              website
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
