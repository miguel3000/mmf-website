import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { galleries } from "@/lib/gallery-data";

const categorySlugs = ["festival", "auto", "model", "webshop", "vrij-werk"];
const heroImages: Record<string, string> = {
  festival: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 9.jpg",
  auto: "/images/auto/Michiel Maessen Fotografie - Audi -Stuur.jpg",
  model: "/images/model/Michiel Maessen Fotografie - Model - 13.jpg",
  webshop: "/images/webshop/Michiel Maessen Fotografie - Muifel - 2.jpg",
  "vrij-werk": "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 8.jpg",
};

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorySlugs.map((slug) => (
            <Link
              key={slug}
              href={`/portfolio/${slug}`}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={heroImages[slug] || galleries[slug][0]?.src || ""}
                alt={t(`categories.${slug}.label`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center">
                <span className="font-heading text-3xl sm:text-4xl text-white tracking-wider">
                  {t(`categories.${slug}.label`)}
                </span>
                <span className="text-white/70 text-sm mt-1">
                  {t(`categories.${slug}.description`)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
