# i18n: English Version of michielmaessen.com

**Date**: 2026-05-15
**Approach**: `next-intl` with path-prefix routing

## Goals

- Add full English translation of the website (except recipes page)
- Dutch remains the default language (no URL prefix)
- English accessible at `/en/...`
- Fixed NL | EN language toggle visible on all pages

## URL Routing

| Dutch (default) | English |
|---|---|
| `/` | `/en` |
| `/portfolio` | `/en/portfolio` |
| `/portfolio/[category]` | `/en/portfolio/[category]` |
| `/contact` | `/en/contact` |
| `/links` | `/en/links` |
| `/recepten` | _(not available)_ |

## Architecture

### Library

`next-intl` — handles locale routing, translation loading, and `<html lang>` switching.

### File Structure

```
src/
├── messages/
│   ├── nl.json              # Dutch translations
│   └── en.json              # English translations
├── i18n/
│   ├── routing.ts           # Locale config (default: nl, supported: [nl, en])
│   └── request.ts           # Server-side i18n config
├── middleware.ts             # Locale detection & redirect
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Root layout (dynamic lang attr)
│   │   ├── page.tsx         # Home / Team
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [category]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── links/page.tsx
│   └── recepten/            # Outside [locale] — Dutch only
│       ├── page.tsx
│       └── RecipeList.tsx
```

### Translation File Structure

```json
{
  "nav": { "home": "...", "portfolio": "...", "contact": "...", "links": "..." },
  "home": { "title": "...", "subtitle": "..." },
  "team": {
    "michiel1": { "role": "...", "description": "...", "skills": { ... } },
    "michiel2": { ... },
    "michiel3": { ... }
  },
  "contact": { "title": "...", "phone": { ... }, "email": { ... }, "location": { ... } },
  "portfolio": { "title": "...", "categories": { ... } },
  "gallery": { "festival": { ... }, "auto": { ... }, ... },
  "footer": { "contact": "...", "serviceArea": "...", "serviceAreaText": "..." },
  "common": { "openMenu": "...", "close": "...", "previous": "...", "next": "..." }
}
```

### Language Toggle

- Fixed position, top-left area (desktop: below logo region, mobile: top-left corner)
- Simple `NL | EN` text toggle, monochrome, matching site aesthetic
- Uses `next-intl` Link to switch locale while staying on the same page path

### SEO

- Dynamic `<html lang="nl|en">`
- `hreflang` alternate links in metadata
- Separate title/description per locale

## Scope

### Translated

- All UI strings (nav labels, buttons, aria labels)
- Team bios, roles, skill labels
- Page titles, subtitles, hero text
- Gallery category names and descriptions
- Footer content
- Page metadata

### Not translated

- Recipe page (excluded from English version entirely)
- Proper nouns (names, cities, email, phone)
- Image paths
