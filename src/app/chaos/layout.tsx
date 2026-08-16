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
  title: "Chaos - Als ik ben weggelopen",
  description:
    "Heb je Chaos gevonden? Neem contact op met zijn baasje. Chaos is een Husky/Retriever/Herder mix met blauwe ogen.",
};

export default function ChaosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body className="antialiased font-sans bg-white dark:bg-bg-dark text-primary dark:text-white/90 transition-colors">
        {children}
      </body>
    </html>
  );
}
