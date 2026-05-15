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
