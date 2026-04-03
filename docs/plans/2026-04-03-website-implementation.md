# Michiel Maessen Fotografie — Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a monochrome Next.js 15 photography portfolio site with vertical Bebas Neue logo branding, replacing the existing WordPress site at michielmaessen.com.

**Architecture:** Next.js 15 App Router with Tailwind CSS v4. Static image files in `public/images/[gallery]/`. Reusable components for gallery grids, lightbox, and profile cards. Hamburger-only navigation on all breakpoints.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Google Fonts (Bebas Neue + Inter), Vercel

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `.gitignore`

**Step 1: Initialize Next.js project**

Run:
```bash
cd /Users/pumpkin/Claude/michielmaessen
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

If directory not empty, accept overwrite for config files.

**Step 2: Configure Tailwind CSS v4 with custom theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-primary: #333333;
  --color-secondary: #666666;
  --color-muted: #999999;
  --color-surface: #f5f5f5;
  --color-border: #e0e0e0;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-heading: "Bebas Neue", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Step 3: Configure layout with Google Fonts**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerticalLogo from "@/components/VerticalLogo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Michiel Maessen Fotografie",
  description:
    "Professionele fotografie in Oss, Den Bosch, Nijmegen en omstreken. Model-, product-, webshop- en evenementfotografie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased font-sans bg-white text-primary">
        <VerticalLogo />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 4: Create image directories**

Run:
```bash
mkdir -p public/images/{team,festival,auto,model,webshop,vrij-werk}
```

**Step 5: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts (will show errors for missing components — that's fine, we build those next)

**Step 6: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 project with Tailwind CSS v4 and Bebas Neue font"
```

---

### Task 2: VerticalLogo Component

**Files:**
- Create: `src/components/VerticalLogo.tsx`

**Step 1: Build the vertical logo component**

```tsx
"use client";

export default function VerticalLogo() {
  return (
    <>
      {/* Desktop: fixed left sidebar logo */}
      <div
        className="hidden lg:flex fixed left-0 top-0 h-screen w-16 items-center justify-center z-40 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-heading text-primary text-2xl tracking-[0.15em] whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          MICHIEL MAESSEN FOTOGRAFIE
        </span>
      </div>

      {/* Mobile: fixed transparent watermark behind content */}
      <div
        className="lg:hidden fixed inset-0 flex items-center justify-center z-0 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-heading text-primary/[0.06] text-[20vw] leading-none tracking-[0.1em] whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          MICHIEL MAESSEN FOTOGRAFIE
        </span>
      </div>
    </>
  );
}
```

**Step 2: Verify in browser**

Run: `npm run dev`
Check: Vertical text visible on left side (desktop), large transparent watermark (mobile/narrow window)

**Step 3: Commit**

```bash
git add src/components/VerticalLogo.tsx
git commit -m "feat: add VerticalLogo component with desktop sidebar and mobile watermark"
```

---

### Task 3: Header Component (Hamburger Menu)

**Files:**
- Create: `src/components/Header.tsx`

**Step 1: Build hamburger-only header**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "Links", href: "/links" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
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
      {/* Hamburger button — top right, always visible */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-50 p-2 rounded-lg hover:bg-surface transition-colors"
        aria-label="Menu openen"
      >
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Full-screen overlay menu */}
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

**Step 2: Verify in browser**

Check: Hamburger icon top-right, click opens full-screen overlay with Bebas Neue nav links

**Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header with full-screen hamburger menu overlay"
```

---

### Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Build minimal footer**

```tsx
export default function Footer() {
  return (
    <footer className="relative z-10 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl tracking-wider mb-3">
              MICHIEL MAESSEN FOTOGRAFIE
            </h3>
            <p className="text-white/50 text-sm">
              Mekelenkamplaan 13, 5345GL Oss
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              CONTACT
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

          {/* Service Areas (SEO) */}
          <div>
            <h4 className="font-heading text-lg tracking-wider text-white/40 mb-3">
              WERKGEBIED
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Fotograaf Oss · Den Bosch · Nijmegen · Uden · Eindhoven · Utrecht · Breda
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Michiel Maessen Fotografie
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add minimal Footer with contact info and service areas"
```

---

### Task 5: ProfileCard Component

**Files:**
- Create: `src/components/ProfileCard.tsx`

**Step 1: Build profile card with skill bars**

```tsx
import Image from "next/image";

interface SkillBar {
  label: string;
  percentage: number;
}

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  skills: SkillBar[];
}

export default function ProfileCard({
  name,
  role,
  description,
  imageSrc,
  skills,
}: ProfileCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="aspect-[3/4] relative">
        <Image
          src={imageSrc}
          alt={`${name} - ${role}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="font-heading text-3xl tracking-wider text-primary">
          {name}
        </h2>
        <p className="text-secondary text-sm uppercase tracking-wider mt-1 mb-4">
          {role}
        </p>
        <p className="text-secondary text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>{skill.label}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ProfileCard.tsx
git commit -m "feat: add ProfileCard component with skill bars"
```

---

### Task 6: Homepage (Team Page)

**Files:**
- Create: `src/app/page.tsx`

**Step 1: Build the team/home page**

```tsx
import ProfileCard from "@/components/ProfileCard";

const teamMembers = [
  {
    name: "MICHIEL",
    role: "De Boekhouder",
    description:
      "Houdt de papierwinkel op orde. Houdt van sterrenkijken en sudoku. Zonder hem geen facturen, en zonder facturen geen koffie.",
    imageSrc: "/images/team/michiel-boekhouder.jpg",
    skills: [
      { label: "Koffie", percentage: 40 },
      { label: "Gezelligheid", percentage: 60 },
      { label: "Motivatie", percentage: 85 },
    ],
  },
  {
    name: "MICHIEL",
    role: "De Fotograaf",
    description:
      "Oprichter met meer dan 20 jaar ervaring. Technisch onderlegd en gepassioneerd. Kan niet stoppen met klikken.",
    imageSrc: "/images/team/michiel-fotograaf.jpg",
    skills: [
      { label: "Koffie", percentage: 90 },
      { label: "Gezelligheid", percentage: 95 },
      { label: "Motivatie", percentage: 100 },
    ],
  },
  {
    name: "MICHIEL",
    role: "De Beeldbewerker",
    description:
      "Medewerker sinds 2008. Perfectionist die elke pixel controleert. Leeft op koffie en deadlines.",
    imageSrc: "/images/team/michiel-beeldbewerker.jpg",
    skills: [
      { label: "Koffie", percentage: 100 },
      { label: "Gezelligheid", percentage: 70 },
      { label: "Motivatie", percentage: 90 },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10">
      {/* Hero section */}
      <section className="min-h-[40vh] flex items-center justify-center px-6 pt-24 pb-12">
        <div className="text-center">
          <h1 className="font-heading text-5xl sm:text-7xl tracking-wider text-primary">
            HET TEAM
          </h1>
          <p className="mt-4 text-secondary max-w-lg mx-auto">
            Drie Michiels. Eén missie. Beelden die blijven hangen.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24 lg:pl-24">
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

Note: The `lg:pl-24` on the content section gives room for the desktop vertical logo on the left.

**Step 2: Add placeholder team images**

The user will supply real images. For now, create placeholder text files so the paths are clear:

```bash
touch public/images/team/michiel-boekhouder.jpg
touch public/images/team/michiel-fotograaf.jpg
touch public/images/team/michiel-beeldbewerker.jpg
```

(Replace with real images before deploying)

**Step 3: Verify in browser**

Run: `npm run dev`
Check: Homepage shows "HET TEAM" heading with three profile cards

**Step 4: Commit**

```bash
git add src/app/page.tsx public/images/team/
git commit -m "feat: add homepage with 3x Michiel team cards"
```

---

### Task 7: ImageGrid Component

**Files:**
- Create: `src/components/ImageGrid.tsx`

**Step 1: Build reusable uniform grid**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

interface ImageGridProps {
  images: { src: string; alt: string }[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="aspect-square relative overflow-hidden group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ImageGrid.tsx
git commit -m "feat: add ImageGrid component with lightbox integration"
```

---

### Task 8: Lightbox Component

**Files:**
- Create: `src/components/Lightbox.tsx`

**Step 1: Build full-screen lightbox**

```tsx
"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";

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
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        aria-label="Sluiten"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        aria-label="Vorige"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
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

      {/* Next */}
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
        aria-label="Volgende"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Lightbox.tsx
git commit -m "feat: add Lightbox component with keyboard navigation"
```

---

### Task 9: Portfolio Overview Page

**Files:**
- Create: `src/app/portfolio/page.tsx`

**Step 1: Build portfolio overview with category highlights**

```tsx
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    slug: "festival",
    label: "FESTIVAL",
    description: "Evenementen en festivals",
    image: "/images/festival/highlight.jpg",
  },
  {
    slug: "auto",
    label: "AUTO",
    description: "B&B Designs",
    image: "/images/auto/highlight.jpg",
  },
  {
    slug: "model",
    label: "MODEL",
    description: "Modelfotografie",
    image: "/images/model/highlight.jpg",
  },
  {
    slug: "webshop",
    label: "WEBSHOP",
    description: "Webshop fotografie",
    image: "/images/webshop/highlight.jpg",
  },
  {
    slug: "vrij-werk",
    label: "VRIJ WERK",
    description: "Persoonlijke projecten",
    image: "/images/vrij-werk/highlight.jpg",
  },
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
                src={cat.image}
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
```

**Step 2: Create placeholder highlight images**

```bash
touch public/images/festival/highlight.jpg
touch public/images/auto/highlight.jpg
touch public/images/model/highlight.jpg
touch public/images/webshop/highlight.jpg
touch public/images/vrij-werk/highlight.jpg
```

**Step 3: Commit**

```bash
git add src/app/portfolio/
git commit -m "feat: add portfolio overview page with category grid"
```

---

### Task 10: Gallery Page Template (Dynamic Route)

**Files:**
- Create: `src/app/portfolio/[category]/page.tsx`
- Create: `src/lib/gallery-data.ts`

**Step 1: Create gallery data file**

```tsx
// src/lib/gallery-data.ts

export interface GalleryCategory {
  slug: string;
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}

export const galleries: Record<string, GalleryCategory> = {
  festival: {
    slug: "festival",
    title: "FESTIVAL",
    description:
      "HipHop in je Smoel. Te gekke gasten. Ze vroegen mij of ik foto's van een aantal optredens wilde maken tijdens Paaspop voor bij de artikelen. Zeg ik geen nee tegen. Vette plaatjes geworden.",
    images: [
      // Add images here: { src: "/images/festival/1.jpg", alt: "Festival foto 1" }
    ],
  },
  auto: {
    slug: "auto",
    title: "AUTO",
    description:
      "Automotive fotografie in samenwerking met B&B Designs.",
    images: [],
  },
  model: {
    slug: "model",
    title: "MODEL",
    description:
      "Voor onder andere MsMode maakte ik deze mooie beelden. In samenwerking met stylist Iris en modellen: Lottie, Sharon, Fenna, Astrid, Marjolein, Isadee, Diante en Ziarah.",
    images: [],
  },
  webshop: {
    slug: "webshop",
    title: "WEBSHOP FOTOGRAFIE",
    description:
      "Professionele productfotografie voor webshops en online catalogi.",
    images: [],
  },
  "vrij-werk": {
    slug: "vrij-werk",
    title: "VRIJ WERK",
    description:
      "Vrij werk gemaakt samen met Sacha Mekel bij Studio Van Soest in Rotterdam. Hele leuke dag met super resultaat.",
    images: [],
  },
};
```

**Step 2: Create the dynamic gallery page**

```tsx
// src/app/portfolio/[category]/page.tsx
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

      <section className="max-w-6xl mx-auto px-6 pb-24 lg:pl-24">
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
```

**Step 3: Commit**

```bash
git add src/lib/gallery-data.ts src/app/portfolio/
git commit -m "feat: add dynamic gallery pages with data-driven image grid"
```

---

### Task 11: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Build contact page**

```tsx
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
```

**Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add contact page with phone, email, and location"
```

---

### Task 12: Links Page

**Files:**
- Create: `src/app/links/page.tsx`

**Step 1: Build links page**

```tsx
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
```

**Step 2: Commit**

```bash
git add src/app/links/page.tsx
git commit -m "feat: add links page with partner brands"
```

---

### Task 13: Final Polish & Verification

**Step 1: Verify all routes work**

Run: `npm run dev`

Check each route:
- `/` — Team page with 3 profile cards
- `/portfolio` — Category grid overview
- `/portfolio/festival` (and other categories) — Gallery page with description
- `/contact` — Phone, email, location
- `/links` — Partner links

**Step 2: Verify responsive behavior**

- Desktop: Vertical logo fixed on left, content offset with `lg:pl-24`
- Mobile: Large transparent watermark behind content, content scrolls over it
- Hamburger menu works on both breakpoints

**Step 3: Run production build**

Run: `npm run build`
Expected: No errors

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete Michiel Maessen Fotografie website"
```

---

### Task 14: GitHub & Vercel Setup

**Step 1: Create GitHub repository**

Run:
```bash
gh repo create michielmaessen --private --source=. --push
```

Or: create via GitHub Desktop (user's preferred workflow).

**Step 2: Connect to Vercel**

- Go to vercel.com → Import project → select `michielmaessen` repo
- Framework: Next.js (auto-detected)
- Deploy

**Step 3: Configure custom domain**

- In Vercel project settings → Domains → add `michielmaessen.com` and `www.michielmaessen.com`
- Update DNS records at domain registrar to point to Vercel

---

### After Implementation: Add Real Images

The user has images available. After the site is deployed:

1. Place team portraits in `public/images/team/`
2. Place gallery images in `public/images/[category]/`
3. Place one highlight image per category as `highlight.jpg`
4. Update `src/lib/gallery-data.ts` with the actual image file names
5. Update team descriptions in `src/app/page.tsx` if needed to match current website copy
6. Commit and push — Vercel auto-deploys
