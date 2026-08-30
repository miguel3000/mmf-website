import { Inter, Bebas_Neue } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Spullen gevonden? — Michiel Maessen Fotografie",
  description:
    "Heb je fotografie-apparatuur gevonden? Neem contact op met Michiel Maessen om het terug te geven.",
};

export default function QrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body className="antialiased font-sans bg-white dark:bg-bg-dark text-primary dark:text-white/90 transition-colors">
        {children}
      </body>
    </html>
  );
}
