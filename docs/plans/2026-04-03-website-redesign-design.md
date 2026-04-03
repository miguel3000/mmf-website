# Michiel Maessen Fotografie — Website Redesign Design

## Overview
Replace the existing WordPress site (michielmaessen.com) with a custom Next.js 15 site, matching the architecture of the PJ Professionals project. The new site prioritizes clean, monochrome design with Bebas Neue typography — letting the photography be the only color.

## Brand & Visual Identity

### Logo
- "MICHIEL MAESSEN FOTOGRAFIE" in Bebas Neue, rotated 90° (vertical)
- **Desktop**: Fixed on the left edge of the viewport as a sidebar brand element
- **Mobile**: Same vertical 90° logo, large, semi-transparent, fixed to the background — page content scrolls over it as a watermark

### Colors (monochrome)
| Token       | Value     | Usage                          |
|-------------|-----------|--------------------------------|
| primary     | #333333   | Headings, logo, primary text   |
| secondary   | #666666   | Body text, subtle elements     |
| muted       | #999999   | Captions, metadata             |
| surface     | #f5f5f5   | Alternate section backgrounds  |
| background  | #ffffff   | Page background                |
| border      | #e0e0e0   | Dividers, card borders         |

### Typography
- **Headings**: Bebas Neue (all caps) — via Google Fonts
- **Body**: Inter — clean, neutral sans-serif

## Navigation
- **Hamburger menu only** (both desktop and mobile) — keeps header minimal
- Click/tap opens slide-out or full-screen overlay menu
- Homepage reached via logo or home icon

### Menu items
- Portfolio
- Contact
- Links

## Routes & Pages

| Route                  | Page                                      |
|------------------------|-------------------------------------------|
| `/`                    | Homepage (Team / 3x Michiel)              |
| `/portfolio`           | Portfolio overview (highlight per category)|
| `/portfolio/festival`  | Festival gallery                          |
| `/portfolio/auto`      | Auto / B&B Designs gallery                |
| `/portfolio/model`     | Model gallery                             |
| `/portfolio/webshop`   | Webshop Fotografie gallery                |
| `/portfolio/vrij-werk` | Vrij Werk gallery                         |
| `/contact`             | Contact (phone, email, location)          |
| `/links`               | Partner links                             |

## Page Designs

### Homepage (`/`) — Team Page
- The 3x Michiel concept: Accountant, Photographer, Image Editor
- Three profile cards with photo, name, role, fun description
- Skill bars (Coffee, Sociability, Motivation)
- First thing visitors see — sets the brand personality

### Portfolio Overview (`/portfolio`)
- Curated grid: one highlight image per category
- Each links to its respective gallery page
- Category name overlaid or below each image

### Portfolio Gallery Pages (`/portfolio/[category]`)
- Page title in Bebas Neue
- Brief description text (casual Dutch copy from current site)
- Uniform grid of thumbnails (consistent aspect ratio)
- Lightbox on click for full-size viewing

### Contact (`/contact`)
- Phone: +31653117778 (click-to-call)
- Email: website@michielmaessen.com (click-to-mail)
- Location: Oss (headquarters)
- Service areas: Oss, Den Bosch, Nijmegen, Uden, Eindhoven, Utrecht, Breda
- Optional simple contact form

### Links (`/links`)
- Clean list/grid of partner brands
- MsMode, Moodies, Maicos Automotive, B&B Designs, Speezys, etc.

## Components

| Component          | Purpose                                                    |
|--------------------|------------------------------------------------------------|
| `Header.tsx`       | Hamburger icon + slide-out/overlay nav                     |
| `Footer.tsx`       | Name, cities, phone, email, SEO keywords                   |
| `VerticalLogo.tsx` | Fixed vertical Bebas Neue logo (sidebar / mobile watermark)|
| `ImageGrid.tsx`    | Reusable uniform thumbnail grid for all galleries          |
| `Lightbox.tsx`     | Full-screen image viewer on thumbnail click                |
| `ProfileCard.tsx`  | Team member card with photo, description, skill bars       |
| `layout.tsx`       | Root layout: fonts, vertical logo, header, footer          |

## Image Structure
```
public/images/
  team/          -- 3x Michiel portraits
  festival/      -- Festival gallery images
  auto/          -- Auto gallery images
  model/         -- Model gallery images
  webshop/       -- Webshop gallery images
  vrij-werk/     -- Vrij Werk gallery images
```

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Font loading**: Google Fonts (Bebas Neue + Inter)
- **Hosting**: Vercel (auto-deploy on push)
- **Git workflow**: GitHub Desktop → commit → push → Vercel auto-deploys

## Business Details
- **Business name**: Michiel Maessen Fotografie
- **Address**: Mekelenkamplaan 13, 5345GL, Oss
- **Phone**: +31653117778
- **Email**: website@michielmaessen.com
- **Admin email**: administratie@michielmaessen.com
- **KVK**: 17222290
- **BTW**: NL001831758B80
