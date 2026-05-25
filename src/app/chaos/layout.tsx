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
    <html lang="nl" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased font-sans bg-white text-primary">
        {children}
      </body>
    </html>
  );
}
