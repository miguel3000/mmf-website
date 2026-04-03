import Image from "next/image";
import Link from "next/link";
import { galleries } from "@/lib/gallery-data";

const categories = [
  { slug: "festival", label: "FESTIVAL", description: "Evenementen en festivals" },
  { slug: "auto", label: "AUTO", description: "B&B Designs" },
  { slug: "model", label: "MODEL", description: "Modelfotografie" },
  { slug: "webshop", label: "WEBSHOP", description: "Webshop fotografie" },
  { slug: "vrij-werk", label: "VRIJ WERK", description: "Persoonlijke projecten" },
];

export default function PortfolioPage() {
  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          PORTFOLIO
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 lg:pl-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/portfolio/${cat.slug}`}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={galleries[cat.slug].images[0]?.src || ""}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center">
                <span className="font-heading text-3xl sm:text-4xl text-white tracking-wider">
                  {cat.label}
                </span>
                <span className="text-white/70 text-sm mt-1">
                  {cat.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
