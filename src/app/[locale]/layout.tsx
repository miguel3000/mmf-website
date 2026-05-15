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
        <main className="lg:ml-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
