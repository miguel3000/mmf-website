import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SpinView from "@/components/SpinView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "spin" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const spinSets: {
  slug: string;
  folder: string;
  frameCount: number;
  prefix?: string;
  suffix?: string;
  padDigits?: number;
  extension?: string;
  width?: number;
  height?: number;
}[] = [
  {
    slug: "bad-bunny-adidas",
    folder: "/images/360/Bad Bunny Adidas",
    frameCount: 40,
    prefix: "314312744304_",
    suffix: "_spin",
    padDigits: 2,
    extension: "jpg",
    width: 800,
    height: 800,
  },
  {
    slug: "adidas-samba-og",
    folder: "/images/360/Adidas Samba OG LB5567 for Foot Locker",
    frameCount: 40,
    prefix: "315350234902_",
    suffix: "_spin",
    padDigits: 2,
    extension: "jpg",
    width: 800,
    height: 800,
  },
  {
    slug: "anthony-edwards-3",
    folder: "/images/360/Anthony Edwards 3 Adidas KH8537 for Foot Locker",
    frameCount: 72,
    prefix: "314109972704_",
    suffix: "_spin",
    padDigits: 2,
    extension: "jpg",
    width: 800,
    height: 800,
  },
  {
    slug: "new-balance-abzorb-2000",
    folder: "/images/360/New Balance Abzorb 2000 U200071Y for Foot Locker",
    frameCount: 72,
    prefix: "315217583202_",
    suffix: "_spin",
    padDigits: 2,
    extension: "jpg",
    width: 800,
    height: 800,
  },
];

export default function SpinPage() {
  const t = useTranslations("spin");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary dark:text-white/90">
            {t("title")}
          </h1>
          <p className="mt-4 text-primary dark:text-white/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        {spinSets.length > 0 ? (
          <div className="space-y-16">
            {spinSets.map((set) => (
              <div key={set.slug}>
                <h2 className="font-heading text-3xl tracking-wider text-primary dark:text-white/90 mb-6">
                  {t(`sets.${set.slug}.title`)}
                </h2>
                <SpinView
                  folder={set.folder}
                  frameCount={set.frameCount}
                  prefix={set.prefix}
                  suffix={set.suffix}
                  padDigits={set.padDigits}
                  extension={set.extension}
                  width={set.width}
                  height={set.height}
                  hint={t("hint")}
                />
                <p className="mt-4 text-primary dark:text-white/70 text-sm">
                  {t(`sets.${set.slug}.description`)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-secondary dark:text-white/50">
              {t("comingSoon")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
