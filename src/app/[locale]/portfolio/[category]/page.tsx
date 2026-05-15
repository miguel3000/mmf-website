import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { galleries } from "@/lib/gallery-data";
import { Link } from "@/i18n/navigation";
import ImageGrid from "@/components/ImageGrid";

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export function generateStaticParams() {
  return Object.keys(galleries).map((category) => ({ category }));
}

export default async function GalleryPage({ params }: Props) {
  const { category } = await params;
  const images = galleries[category];

  if (!images) return notFound();

  return <GalleryContent category={category} />;
}

function GalleryContent({ category }: { category: string }) {
  const t = useTranslations();
  const images = galleries[category];

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex flex-col items-center justify-center px-6 pt-24 pb-8">
        <Link
          href="/portfolio"
          className="text-muted text-sm hover:text-primary transition-colors mb-4"
        >
          &larr; {t("common.backToPortfolio")}
        </Link>
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {t(`gallery.${category}.title`)}
        </h1>
        <p className="mt-4 text-secondary max-w-2xl text-center">
          {t(`gallery.${category}.description`)}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {images.length > 0 ? (
          <ImageGrid images={images} />
        ) : (
          <p className="text-muted text-center py-12">
            {t("common.photosComingSoon")}
          </p>
        )}
      </section>
    </div>
  );
}
