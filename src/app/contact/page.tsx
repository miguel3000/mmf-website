export default function ContactPage() {
  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          CONTACT
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24 lg:pl-24">
        <div className="space-y-8">
          {/* Phone */}
          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              BELLEN
            </h2>
            <p className="text-secondary text-sm mb-3">
              Klik hier om mij te bellen (werkt het beste met je mobiel).
            </p>
            <a
              href="tel:+31653117778"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              +31 6 53117778
            </a>
          </div>

          {/* Email */}
          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              MAILEN
            </h2>
            <p className="text-secondary text-sm mb-3">
              Stuur mij een berichtje, vind ik leuk!
            </p>
            <a
              href="mailto:website@michielmaessen.com"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              website@michielmaessen.com
            </a>
          </div>

          {/* Location */}
          <div>
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              LOCATIE
            </h2>
            <p className="text-secondary text-sm mb-3">
              Hoofdkwartier in Oss
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              Werkzaam in: Oss, Den Bosch, Nijmegen, Uden, Eindhoven, Utrecht en Breda
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
