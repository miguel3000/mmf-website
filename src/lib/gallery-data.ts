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
  },
  auto: {
    slug: "auto",
    title: "AUTO",
    description:
      "Automotive fotografie in samenwerking met B&B Designs.",
    images: [
      { src: "/images/auto/Michiel Maessen Fotografie - Audi -Console-Stiksel.jpg", alt: "Audi interieur console stiksel detail" },
      { src: "/images/auto/Michiel Maessen Fotografie - Audi -Console.jpg", alt: "Audi interieur console" },
      { src: "/images/auto/Michiel Maessen Fotografie - Audi -Dashboard-Stuur.jpg", alt: "Audi dashboard en stuur" },
      { src: "/images/auto/Michiel Maessen Fotografie - Audi -Doorkijk.jpg", alt: "Audi interieur doorkijk" },
      { src: "/images/auto/Michiel Maessen Fotografie - Audi -Stuur.jpg", alt: "Audi stuur detail" },
      { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0002.jpg", alt: "Chevrolet automotive fotografie 1" },
      { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0039.jpg", alt: "Chevrolet automotive fotografie 2" },
      { src: "/images/auto/Michiel Maessen Fotografie - Chevy-2020-0056.jpg", alt: "Chevrolet automotive fotografie 3" },
    ],
  },
  model: {
    slug: "model",
    title: "MODEL",
    description:
      "Voor onder andere MsMode maakte ik deze mooie beelden. In samenwerking met stylist Iris en modellen: Lottie, Sharon, Fenna, Astrid, Marjolein, Isadee, Diante en Ziarah.",
    images: [
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
  },
  webshop: {
    slug: "webshop",
    title: "WEBSHOP FOTOGRAFIE",
    description:
      "Professionele productfotografie voor webshops en online catalogi.",
    images: [
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
  },
  "vrij-werk": {
    slug: "vrij-werk",
    title: "VRIJ WERK",
    description:
      "Vrij werk gemaakt samen met Sacha Mekel bij Studio Van Soest in Rotterdam. Hele leuke dag met super resultaat.",
    images: [
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
  },
};
