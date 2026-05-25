import Image from "next/image";

export default function ChaosPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-6xl sm:text-7xl tracking-wider text-primary">
            CHAOS
          </h1>
          <p className="mt-2 text-lg text-secondary">
            Als je dit leest, ben ik waarschijnlijk weggelopen 🐾
          </p>
        </div>

        {/* Photos */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-surface">
          <Image
            src="/images/chaos/chaos-3.jpg"
            alt="Chaos van dichtbij — blauwe ogen, bruine vacht, leren halsband"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-surface">
            <Image
              src="/images/chaos/chaos-1.jpg"
              alt="Chaos loopt door het bos"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-surface">
            <Image
              src="/images/chaos/chaos-2.jpg"
              alt="Chaos ligt op de bank in de tuin"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Info card */}
        <div className="bg-surface rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-heading text-2xl tracking-wide text-primary">
            OVER MIJ
          </h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted font-medium">Naam</dt>
              <dd className="text-primary font-semibold">Chaos</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted font-medium">Ras</dt>
              <dd className="text-primary">Husky / Retriever / Duitse Herder</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted font-medium">Ogen</dt>
              <dd className="text-primary">Blauw</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted font-medium">Chip</dt>
              <dd className="text-primary">
                Ja — achter in de nek, bovenaan
              </dd>
            </div>
          </dl>
        </div>

        {/* Fun fact */}
        <div className="bg-surface rounded-2xl p-6 mb-6">
          <h2 className="font-heading text-2xl tracking-wide text-primary mb-2">
            LEUK WEETJE
          </h2>
          <p className="text-secondary text-sm">
            Als je je vinger omhoog steekt terwijl je hem aankijkt, gaat hij
            zitten. Handig als hij niet wil luisteren! 😄
          </p>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4">
          <p className="text-secondary">
            Heb je mij gevonden? Bel mijn baasje:
          </p>
          <a
            href="tel:+31653117778"
            className="inline-flex items-center gap-3 bg-primary text-white font-heading text-2xl tracking-wider px-8 py-4 rounded-full hover:bg-secondary transition-colors"
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
          <p className="text-muted text-xs mt-4">
            Alvast heel erg bedankt! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
