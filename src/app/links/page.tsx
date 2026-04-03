const partnerLinks = [
  { name: "MsMode", url: "https://www.msmode.nl" },
  { name: "Moodies", url: "https://www.moodies.nl" },
  { name: "Maicos Automotive", url: "https://www.maicos.nl" },
  { name: "B&B Designs", url: "https://www.bb-designs.nl" },
  { name: "Speezys", url: "https://www.speezys.com" },
];

export default function LinksPage() {
  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          LINKS
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24 lg:pl-24">
        <div className="space-y-4">
          {partnerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border p-6 hover:bg-surface transition-colors group"
            >
              <span className="font-heading text-2xl tracking-wider text-primary group-hover:text-secondary transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
