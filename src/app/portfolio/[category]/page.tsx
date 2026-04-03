import { notFound } from "next/navigation";
import { galleries } from "@/lib/gallery-data";
import ImageGrid from "@/components/ImageGrid";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(galleries).map((category) => ({ category }));
}

export default async function GalleryPage({ params }: Props) {
  const { category } = await params;
  const gallery = galleries[category];

  if (!gallery) return notFound();

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex flex-col items-center justify-center px-6 pt-24 pb-8">
        <Link
          href="/portfolio"
          className="text-muted text-sm hover:text-primary transition-colors mb-4"
        >
          &larr; Portfolio
        </Link>
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {gallery.title}
        </h1>
        <p className="mt-4 text-secondary max-w-2xl text-center">
          {gallery.description}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {gallery.images.length > 0 ? (
          <ImageGrid images={gallery.images} />
        ) : (
          <p className="text-muted text-center py-12">
            Foto&apos;s worden binnenkort toegevoegd.
          </p>
        )}
      </section>
    </div>
  );
}
