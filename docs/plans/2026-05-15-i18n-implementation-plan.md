# i18n English Version Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a full English translation to michielmaessen.com using `next-intl`, with Dutch as default (no prefix) and English at `/en/...`. Recipe page stays Dutch-only.

**Architecture:** `next-intl` handles locale routing via Next.js middleware. All pages move under `src/app/[locale]/` dynamic segment. Translation strings live in `src/messages/{nl,en}.json`. A fixed NL|EN toggle appears on all pages. The `recepten` route stays outside `[locale]` at the app root.

**Tech Stack:** Next.js 15, next-intl, TypeScript, Tailwind CSS v4

---

### Task 1: Install next-intl and create i18n config files

**Files:**
- Modify: `package.json`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`

**Step 1: Install next-intl**

Run: `cd /Users/pumpkin/Claude/michielmaessen && npm install next-intl`

**Step 2: Create `src/i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
});
```

`localePrefix: "as-needed"` means Dutch URLs have no prefix (`/portfolio`), English gets `/en/portfolio`.

**Step 3: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "nl" | "en")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Step 4: Create `src/middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(nl|en)/:path*",
    "/((?!_next|images|recepten|favicon.ico|api).*)",
  ],
};
```

The matcher excludes `/recepten`, `/images`, `/_next`, and other static paths so those are not locale-routed.

**Step 5: Update `next.config.ts`**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

**Step 6: Commit**

```bash
git add package.json package-lock.json src/i18n/ src/middleware.ts next.config.ts
git commit -m "feat: install next-intl and configure i18n routing"
```

---

### Task 2: Create translation JSON files

**Files:**
- Create: `src/messages/nl.json`
- Create: `src/messages/en.json`

**Step 1: Create `src/messages/nl.json`**

```json
{
  "metadata": {
    "title": "Michiel Maessen Fotografie",
    "description": "Professionele fotografie in Oss, Den Bosch, Nijmegen en omstreken. Model-, product-, webshop- en evenementfotografie."
  },
  "nav": {
    "home": "Home",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "links": "Links"
  },
  "common": {
    "openMenu": "Menu openen",
    "close": "Sluiten",
    "previous": "Vorige",
    "next": "Volgende",
    "backToPortfolio": "Portfolio",
    "photosComingSoon": "Foto's worden binnenkort toegevoegd."
  },
  "home": {
    "title": "HET TEAM",
    "subtitle": "Drie Michiels. Eén missie. Beelden die blijven hangen."
  },
  "team": {
    "michiel1": {
      "role": "De Boekhouder",
      "description": "Houdt de papierwinkel op orde. Houdt van sterrenkijken en sudoku. Zonder hem geen facturen, en zonder facturen geen koffie."
    },
    "michiel2": {
      "role": "De Fotograaf",
      "description": "Oprichter met meer dan 20 jaar ervaring. Technisch onderlegd en gepassioneerd. Kan niet stoppen met klikken."
    },
    "michiel3": {
      "role": "De Beeldbewerker",
      "description": "Medewerker sinds 2008. Perfectionist die elke pixel controleert. Leeft op koffie en deadlines."
    },
    "skills": {
      "coffee": "Koffie",
      "fun": "Gezelligheid",
      "motivation": "Motivatie"
    }
  },
  "contact": {
    "title": "CONTACT",
    "phone": {
      "title": "BELLEN",
      "description": "Klik hier om mij te bellen (werkt het beste met je mobiel)."
    },
    "email": {
      "title": "MAILEN",
      "description": "Stuur mij een berichtje, vind ik leuk!"
    },
    "location": {
      "title": "LOCATIE",
      "description": "Hoofdkwartier in Oss",
      "serviceAreas": "Werkzaam in: Oss, Den Bosch, Nijmegen, Uden, Eindhoven, Utrecht en Breda"
    }
  },
  "portfolio": {
    "title": "PORTFOLIO",
    "categories": {
      "festival": { "label": "FESTIVAL", "description": "Evenementen en festivals" },
      "auto": { "label": "AUTO", "description": "Automotive" },
      "model": { "label": "MODEL", "description": "Modelfotografie" },
      "webshop": { "label": "WEBSHOP", "description": "Webshop fotografie" },
      "vrij-werk": { "label": "VRIJ WERK", "description": "Persoonlijke projecten" }
    }
  },
  "gallery": {
    "festival": {
      "title": "FESTIVAL",
      "description": "HipHop in je Smoel. Te gekke gasten. Ze vroegen mij of ik foto's van een aantal optredens wilde maken tijdens Paaspop voor bij de artikelen. Zeg ik geen nee tegen. Vette plaatjes geworden."
    },
    "auto": {
      "title": "AUTO",
      "description": "Automotive fotografie in samenwerking met B&B Designs."
    },
    "model": {
      "title": "MODEL",
      "description": "Voor onder andere MsMode maakte ik deze mooie beelden. In samenwerking met stylist Iris en modellen: Lottie, Sharon, Fenna, Astrid, Marjolein, Isadee, Diante en Ziarah."
    },
    "webshop": {
      "title": "WEBSHOP FOTOGRAFIE",
      "description": "Professionele productfotografie voor webshops en online catalogi."
    },
    "vrij-werk": {
      "title": "VRIJ WERK",
      "description": "Vrij werk gemaakt samen met Sacha Mekel bij Studio Van Soest in Rotterdam. Hele leuke dag met super resultaat."
    }
  },
  "footer": {
    "contact": "CONTACT",
    "serviceArea": "WERKGEBIED",
    "serviceAreaText": "Fotograaf Oss · Den Bosch · Nijmegen · Uden · Eindhoven · Utrecht · Breda"
  },
  "links": {
    "title": "LINKS"
  }
}
```

**Step 2: Create `src/messages/en.json`**

```json
{
  "metadata": {
    "title": "Michiel Maessen Photography",
    "description": "Professional photography in Oss, Den Bosch, Nijmegen and surroundings. Model, product, webshop and event photography."
  },
  "nav": {
    "home": "Home",
    "portfolio": "Portfolio",
    "contact": "Contact",
    "links": "Links"
  },
  "common": {
    "openMenu": "Open menu",
    "close": "Close",
    "previous": "Previous",
    "next": "Next",
    "backToPortfolio": "Portfolio",
    "photosComingSoon": "Photos will be added soon."
  },
  "home": {
    "title": "THE TEAM",
    "subtitle": "Three Michiels. One mission. Images that stick."
  },
  "team": {
    "michiel1": {
      "role": "The Bookkeeper",
      "description": "Keeps the paperwork in order. Loves stargazing and sudoku. No invoices without him, and no coffee without invoices."
    },
    "michiel2": {
      "role": "The Photographer",
      "description": "Founder with over 20 years of experience. Technically skilled and passionate. Can't stop clicking."
    },
    "michiel3": {
      "role": "The Retoucher",
      "description": "Team member since 2008. Perfectionist who checks every pixel. Runs on coffee and deadlines."
    },
    "skills": {
      "coffee": "Coffee",
      "fun": "Good vibes",
      "motivation": "Motivation"
    }
  },
  "contact": {
    "title": "CONTACT",
    "phone": {
      "title": "CALL",
      "description": "Tap here to call me (works best on your phone)."
    },
    "email": {
      "title": "EMAIL",
      "description": "Send me a message, I'd love to hear from you!"
    },
    "location": {
      "title": "LOCATION",
      "description": "Headquarters in Oss",
      "serviceAreas": "Working in: Oss, Den Bosch, Nijmegen, Uden, Eindhoven, Utrecht and Breda"
    }
  },
  "portfolio": {
    "title": "PORTFOLIO",
    "categories": {
      "festival": { "label": "FESTIVAL", "description": "Events and festivals" },
      "auto": { "label": "AUTO", "description": "Automotive" },
      "model": { "label": "MODEL", "description": "Model photography" },
      "webshop": { "label": "WEBSHOP", "description": "Webshop photography" },
      "vrij-werk": { "label": "FREE WORK", "description": "Personal projects" }
    }
  },
  "gallery": {
    "festival": {
      "title": "FESTIVAL",
      "description": "HipHop in je Smoel. Amazing people. They asked me to shoot some performances at Paaspop for their articles. Couldn't say no. Turned out great."
    },
    "auto": {
      "title": "AUTO",
      "description": "Automotive photography in collaboration with B&B Designs."
    },
    "model": {
      "title": "MODEL",
      "description": "Shot for MsMode among others. In collaboration with stylist Iris and models: Lottie, Sharon, Fenna, Astrid, Marjolein, Isadee, Diante and Ziarah."
    },
    "webshop": {
      "title": "WEBSHOP PHOTOGRAPHY",
      "description": "Professional product photography for webshops and online catalogs."
    },
    "vrij-werk": {
      "title": "FREE WORK",
      "description": "Personal work shot with Sacha Mekel at Studio Van Soest in Rotterdam. Great day with amazing results."
    }
  },
  "footer": {
    "contact": "CONTACT",
    "serviceArea": "SERVICE AREA",
    "serviceAreaText": "Photographer Oss · Den Bosch · Nijmegen · Uden · Eindhoven · Utrecht · Breda"
  },
  "links": {
    "title": "LINKS"
  }
}
```

**Step 3: Commit**

```bash
git add src/messages/
git commit -m "feat: add Dutch and English translation files"
```

---

### Task 3: Move pages under `[locale]` dynamic segment

Move all pages except `recepten` into `src/app/[locale]/`. The `recepten` route stays at `src/app/recepten/`.

**Files:**
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- Move: `src/app/contact/page.tsx` → `src/app/[locale]/contact/page.tsx`
- Move: `src/app/portfolio/page.tsx` → `src/app/[locale]/portfolio/page.tsx`
- Move: `src/app/portfolio/[category]/page.tsx` → `src/app/[locale]/portfolio/[category]/page.tsx`
- Move: `src/app/links/page.tsx` → `src/app/[locale]/links/page.tsx`
- Move: `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
- Create: `src/app/layout.tsx` (minimal root layout for `recepten`)
- Keep: `src/app/recepten/` stays in place

**Step 1: Create directory structure**

```bash
mkdir -p src/app/\[locale\]/contact
mkdir -p src/app/\[locale\]/portfolio/\[category\]
mkdir -p src/app/\[locale\]/links
```

**Step 2: Move files**

```bash
mv src/app/page.tsx src/app/[locale]/page.tsx
mv src/app/contact/page.tsx src/app/[locale]/contact/page.tsx
mv src/app/portfolio/page.tsx src/app/[locale]/portfolio/page.tsx
mv src/app/portfolio/[category]/page.tsx src/app/[locale]/portfolio/[category]/page.tsx
mv src/app/links/page.tsx src/app/[locale]/links/page.tsx
mv src/app/layout.tsx src/app/[locale]/layout.tsx
```

Remove empty directories:
```bash
rmdir src/app/contact src/app/portfolio/[category] src/app/portfolio src/app/links
```

**Step 3: Create minimal root layout at `src/app/layout.tsx`**

This is needed because Next.js requires a root layout. It wraps both `[locale]` and `recepten`.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

Note: The `<html>` and `<body>` tags are in `src/app/[locale]/layout.tsx`. The `recepten` pages need their own layout for the html shell — see Task 7.

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: move pages under [locale] dynamic segment"
```

---

### Task 4: Update `[locale]/layout.tsx` with next-intl

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Rewrite the locale layout**

Replace current `layout.tsx` content with:

```tsx
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerticalLogo from "@/components/VerticalLogo";
import LanguageToggle from "@/components/LanguageToggle";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        nl: "/",
        en: "/en",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "nl" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased font-sans bg-white text-primary">
        <NextIntlClientProvider messages={messages}>
          <VerticalLogo />
          <Header />
          <LanguageToggle />
          <main className="lg:ml-[80px]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Key changes from original:
- `lang` attribute is now dynamic from `params.locale`
- Wrapped in `NextIntlClientProvider` so client components can use `useTranslations`
- `generateMetadata` pulls title/description from translations
- `generateStaticParams` generates both locales
- `LanguageToggle` component added (created in Task 6)
- `alternates.languages` for SEO hreflang

**Step 2: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "feat: update locale layout with next-intl provider and dynamic metadata"
```

---

### Task 5: Update all page components to use translations

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/contact/page.tsx`
- Modify: `src/app/[locale]/portfolio/page.tsx`
- Modify: `src/app/[locale]/portfolio/[category]/page.tsx`
- Modify: `src/app/[locale]/links/page.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Lightbox.tsx`
- Modify: `src/lib/gallery-data.ts`

**Step 1: Rewrite Home page `src/app/[locale]/page.tsx`**

```tsx
import { useTranslations } from "next-intl";
import ProfileCard from "@/components/ProfileCard";

const teamImages = [
  "/images/team/Michieldeboekhouder.jpg",
  "/images/team/Michiel Maessen fotograaf.jpg",
  "/images/team/Michieldebeelbewerker.jpg",
];

const teamSkillPercentages = [
  [40, 60, 85],
  [90, 95, 100],
  [100, 70, 90],
];

export default function HomePage() {
  const t = useTranslations();
  const memberKeys = ["michiel1", "michiel2", "michiel3"] as const;
  const skillKeys = ["coffee", "fun", "motivation"] as const;

  const teamMembers = memberKeys.map((key, i) => ({
    name: "MICHIEL",
    role: t(`team.${key}.role`),
    description: t(`team.${key}.description`),
    imageSrc: teamImages[i],
    skills: skillKeys.map((sk, j) => ({
      label: t(`team.skills.${sk}`),
      percentage: teamSkillPercentages[i][j],
    })),
  }));

  return (
    <div className="relative z-10">
      <section className="min-h-[40vh] flex items-center justify-center px-6 pt-24 pb-12">
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
            {t("home.title")}
          </h1>
          <p className="mt-4 text-secondary max-w-lg mx-auto">
            {t("home.subtitle")}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <ProfileCard key={i} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Rewrite Contact page `src/app/[locale]/contact/page.tsx`**

```tsx
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
        <div className="space-y-8">
          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("phone.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("phone.description")}
            </p>
            <a
              href="tel:+31653117778"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              +31 6 53117778
            </a>
          </div>

          <div className="border-b border-border pb-6">
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("email.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("email.description")}
            </p>
            <a
              href="mailto:website@michielmaessen.com"
              className="text-primary text-lg font-medium hover:text-secondary transition-colors"
            >
              website@michielmaessen.com
            </a>
          </div>

          <div>
            <h2 className="font-heading text-2xl tracking-wider text-primary mb-2">
              {t("location.title")}
            </h2>
            <p className="text-secondary text-sm mb-3">
              {t("location.description")}
            </p>
            <p className="text-secondary text-sm leading-relaxed">
              {t("location.serviceAreas")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Rewrite Portfolio overview `src/app/[locale]/portfolio/page.tsx`**

```tsx
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
                src={heroImages[slug] || galleries[slug].images[0]?.src || ""}
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
```

**Step 4: Rewrite Gallery detail `src/app/[locale]/portfolio/[category]/page.tsx`**

```tsx
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
  const gallery = galleries[category];

  if (!gallery) return notFound();

  return <GalleryContent category={category} />;
}

function GalleryContent({ category }: { category: string }) {
  const t = useTranslations();
  const gallery = galleries[category];

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
        {gallery.images.length > 0 ? (
          <ImageGrid images={gallery.images} />
        ) : (
          <p className="text-muted text-center py-12">
            {t("common.photosComingSoon")}
          </p>
        )}
      </section>
    </div>
  );
}
```

**Step 5: Rewrite Links page `src/app/[locale]/links/page.tsx`**

```tsx
import { useTranslations } from "next-intl";

const partnerLinks = [
  { name: "MsMode", url: "https://www.msmode.nl" },
  { name: "Moodies", url: "https://moodiesundies.com" },
  { name: "Maicos Automotive", url: "https://www.maicos.nl" },
  { name: "B&B Designs", url: "https://www.benbdesigns.nl/" },
  { name: "Speezys", url: "https://www.speezys.com" },
  { name: "Spekking BV", url: "https://www.spekking.eu" },
  { name: "PJ Professionals", url: "https://www.pjprofessionals.nl" },
];

export default function LinksPage() {
  const t = useTranslations("links");

  return (
    <div className="relative z-10">
      <section className="min-h-[30vh] flex items-center justify-center px-6 pt-24 pb-8">
        <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
          {t("title")}
        </h1>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-24">
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
```

**Step 6: Update Header component `src/components/Header.tsx`**

Replace hardcoded nav links with translations and use `next-intl` Link:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();

  const navLinks = [
    { label: t("nav.home"), href: "/" as const },
    { label: t("nav.portfolio"), href: "/portfolio" as const },
    { label: t("nav.contact"), href: "/contact" as const },
    { label: t("nav.links"), href: "/links" as const },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-lg hover:bg-surface transition-colors"
        aria-label={t("common.openMenu")}
      >
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-4xl sm:text-5xl text-primary hover:text-secondary transition-colors tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
```

**Step 7: Update Footer component `src/components/Footer.tsx`**

```tsx
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">
              MICHIEL MAESSEN FOTOGRAFIE
            </h3>
            <p className="text-white/50 text-sm">Oss</p>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              {t("contact")}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="tel:+31653117778" className="hover:text-white transition-colors">
                  +31 6 53117778
                </a>
              </li>
              <li>
                <a href="mailto:website@michielmaessen.com" className="hover:text-white transition-colors">
                  website@michielmaessen.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              {t("serviceArea")}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("serviceAreaText")}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Michiel Maessen Fotografie
        </div>
      </div>
    </footer>
  );
}
```

**Step 8: Update Lightbox aria labels `src/components/Lightbox.tsx`**

Change the three hardcoded Dutch aria-labels to accept props:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const t = useTranslations("common");

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        aria-label={t("close")}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        aria-label={t("previous")}
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        aria-label={t("next")}
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
```

**Step 9: Simplify `src/lib/gallery-data.ts`**

Remove `title` and `description` from gallery-data since those now come from translations. Keep only image data:

```ts
export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleries: Record<string, GalleryImage[]> = {
  festival: [
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 1.jpg", alt: "Hip Hop In Je Smoel festival foto 1" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 2.jpg", alt: "Hip Hop In Je Smoel festival foto 2" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 3.jpg", alt: "Hip Hop In Je Smoel festival foto 3" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 4.jpg", alt: "Hip Hop In Je Smoel festival foto 4" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 5.jpg", alt: "Hip Hop In Je Smoel festival foto 5" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 6.jpg", alt: "Hip Hop In Je Smoel festival foto 6" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 7.jpg", alt: "Hip Hop In Je Smoel festival foto 7" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 8.jpg", alt: "Hip Hop In Je Smoel festival foto 8" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 9.jpg", alt: "Hip Hop In Je Smoel festival foto 9" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 10.jpg", alt: "Hip Hop In Je Smoel festival foto 10" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 11.jpg", alt: "Hip Hop In Je Smoel festival foto 11" },
    { src: "/images/festival/Michiel Maessen Fotografie - Hip Hop In Je Smoel - 12.jpg", alt: "Hip Hop In Je Smoel festival foto 12" },
  ],
  auto: [
    { src: "/images/auto/Michiel Maessen Fotografie - Audi -Console-Stiksel.jpg", alt: "Audi interieur console stiksel detail" },
    { src: "/images/auto/Michiel Maessen Fotografie - Audi -Console.jpg", alt: "Audi interieur console" },
    { src: "/images/auto/Michiel Maessen Fotografie - Audi -Dashboard-Stuur.jpg", alt: "Audi dashboard en stuur" },
    { src: "/images/auto/Michiel Maessen Fotografie - Audi -Doorkijk.jpg", alt: "Audi interieur doorkijk" },
    { src: "/images/auto/Michiel Maessen Fotografie - Audi -Stuur.jpg", alt: "Audi stuur detail" },
    { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0002.jpg", alt: "Chevrolet automotive fotografie 1" },
    { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0039.jpg", alt: "Chevrolet automotive fotografie 2" },
    { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0056.jpg", alt: "Chevrolet automotive fotografie 3" },
  ],
  model: [
    { src: "/images/model/Michiel Maessen Fotografie - Model - 1.jpg", alt: "Model fotografie 1" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 2.jpg", alt: "Model fotografie 2" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 3.jpg", alt: "Model fotografie 3" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 4.jpg", alt: "Model fotografie 4" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 5.jpg", alt: "Model fotografie 5" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 6.jpg", alt: "Model fotografie 6" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 7.jpg", alt: "Model fotografie 7" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 8.jpg", alt: "Model fotografie 8" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 9.jpg", alt: "Model fotografie 9" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 10.jpg", alt: "Model fotografie 10" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 11.jpg", alt: "Model fotografie 11" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 12.jpg", alt: "Model fotografie 12" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 13.jpg", alt: "Model fotografie 13" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 14.jpg", alt: "Model fotografie 14" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 15.jpg", alt: "Model fotografie 15" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 16.jpg", alt: "Model fotografie 16" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 17.jpg", alt: "Model fotografie 17" },
    { src: "/images/model/Michiel Maessen Fotografie - Model - 18.jpg", alt: "Model fotografie 18" },
  ],
  webshop: [
    { src: "/images/webshop/Michiel Maessen Fotografie - Float Plus - 1.gif", alt: "Float Plus product animatie" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Float Plus - 2.jpg", alt: "Float Plus productfoto 2" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Float Plus - 3.jpg", alt: "Float Plus productfoto 3" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Hakbij Glass - 9.jpg", alt: "Hakbij Glass productfoto 1" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Hakbij Glass - 10.jpg", alt: "Hakbij Glass productfoto 2" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Hakbij Glass - 11.jpg", alt: "Hakbij Glass productfoto 3" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Hakbij Glass - 12.jpg", alt: "Hakbij Glass productfoto 4" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 1.jpg", alt: "Muifel productfoto 1" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 2.jpg", alt: "Muifel productfoto 2" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 3.jpg", alt: "Muifel productfoto 3" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 4.jpg", alt: "Muifel productfoto 4" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 5.jpg", alt: "Muifel productfoto 5" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 6.jpg", alt: "Muifel productfoto 6" },
    { src: "/images/webshop/Michiel Maessen Fotografie - Muifel - 7.jpg", alt: "Muifel productfoto 7" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 1.jpg", alt: "TIZDESIGN productfoto 1" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 2.jpg", alt: "TIZDESIGN productfoto 2" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 3.jpg", alt: "TIZDESIGN productfoto 3" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 4.jpg", alt: "TIZDESIGN productfoto 4" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 5.jpg", alt: "TIZDESIGN productfoto 5" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 6.jpg", alt: "TIZDESIGN productfoto 6" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 7.jpg", alt: "TIZDESIGN productfoto 7" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 8.jpg", alt: "TIZDESIGN productfoto 8" },
    { src: "/images/webshop/Michiel Maessen Fotografie - TIZDESIGN - 9.jpg", alt: "TIZDESIGN productfoto 9" },
  ],
  "vrij-werk": [
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 1.jpg", alt: "Vrij werk fotografie 1" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 2.jpg", alt: "Vrij werk fotografie 2" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 3.jpg", alt: "Vrij werk fotografie 3" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 4.jpg", alt: "Vrij werk fotografie 4" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 5.jpg", alt: "Vrij werk fotografie 5" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 6.jpg", alt: "Vrij werk fotografie 6" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 7.jpg", alt: "Vrij werk fotografie 7" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERK - 8.jpg", alt: "Vrij werk fotografie 8" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERKPRODUCT - 1.jpg", alt: "Vrij werk productfotografie 1" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERKPRODUCT - 2.jpg", alt: "Vrij werk productfotografie 2" },
    { src: "/images/vrij-werk/Michiel Maessen Fotografie - VRIJWERKPRODUCT - 3.jpg", alt: "Vrij werk productfotografie 3" },
  ],
};
```

**Step 10: Create `src/i18n/navigation.ts`**

This creates locale-aware `Link`, `redirect`, and `usePathname` helpers:

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**Step 11: Commit**

```bash
git add -A
git commit -m "feat: convert all pages and components to use next-intl translations"
```

---

### Task 6: Create LanguageToggle component

**Files:**
- Create: `src/components/LanguageToggle.tsx`

**Step 1: Create the component**

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: "nl" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="fixed top-7 right-20 z-50 flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchLocale("nl")}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === "nl"
            ? "text-primary"
            : "text-muted hover:text-secondary"
        }`}
        aria-label="Nederlands"
      >
        NL
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-1.5 py-0.5 transition-colors ${
          locale === "en"
            ? "text-primary"
            : "text-muted hover:text-secondary"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
```

Positioned `top-7 right-20` to sit just left of the hamburger button (`top-6 right-6`). Monochrome styling matches the site aesthetic. Active locale is `text-primary` (dark), inactive is `text-muted`.

**Step 2: Commit**

```bash
git add src/components/LanguageToggle.tsx
git commit -m "feat: add fixed NL|EN language toggle component"
```

---

### Task 7: Handle recepten page (Dutch-only, outside locale)

**Files:**
- Create: `src/app/recepten/layout.tsx`

The `recepten` page files are already in `src/app/recepten/` (they were never moved). They need their own layout that provides the HTML shell since they're outside `[locale]`.

**Step 1: Create `src/app/recepten/layout.tsx`**

```tsx
import { Inter, Bebas_Neue } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export default function ReceptenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased font-sans bg-white text-primary">
        {children}
      </body>
    </html>
  );
}
```

Note: The recepten page is a standalone page with no nav/footer (it's a recipe collection side feature). If it needs Header/Footer, they can be added here without `NextIntlClientProvider` — but the current version doesn't use them.

**Step 2: Commit**

```bash
git add src/app/recepten/layout.tsx
git commit -m "feat: add standalone layout for Dutch-only recepten page"
```

---

### Task 8: Build, test, and fix

**Step 1: Run the build**

```bash
cd /Users/pumpkin/Claude/michielmaessen && npm run build
```

Fix any TypeScript or build errors that arise.

**Step 2: Run dev server and test**

```bash
npm run dev
```

Test checklist:
- [ ] `/` loads Dutch home page with "HET TEAM"
- [ ] `/en` loads English home page with "THE TEAM"
- [ ] NL|EN toggle is visible and switches language
- [ ] `/portfolio` shows Dutch category labels
- [ ] `/en/portfolio` shows English category labels
- [ ] `/portfolio/festival` shows Dutch gallery description
- [ ] `/en/portfolio/festival` shows English gallery description
- [ ] `/contact` shows Dutch headings (BELLEN, MAILEN, LOCATIE)
- [ ] `/en/contact` shows English headings (CALL, EMAIL, LOCATION)
- [ ] `/links` and `/en/links` both work
- [ ] `/recepten` still works (Dutch only, no locale prefix)
- [ ] Nav links work correctly in both languages
- [ ] Footer shows translated WERKGEBIED / SERVICE AREA
- [ ] Lightbox prev/next/close aria labels match locale
- [ ] `<html lang>` is correct for each locale
- [ ] Browser back/forward works after locale switch

**Step 3: Fix any issues found**

**Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve build and runtime issues with i18n setup"
```

---

### Task 9: Final commit and push

**Step 1: Verify clean build**

```bash
npm run build
```

**Step 2: Push to GitHub**

```bash
git push
```

Vercel will auto-deploy from the push.
