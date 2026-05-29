import type { Metadata } from "next";
import "./globals.css"; 
import { SpeedInsights } from "@vercel/speed-insights/next"

// To co je úplně tahoře v tabu //
export const metadata: Metadata = {
  title: "Portfolio",
};

// Hlavní šablona //
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      {/* OPRAVA: Přidali jsme bg-[var(--page-bg)] do className, aby Tailwind v4 věděl, že se tu mění barva */}
      <body>
        {/* Tady můžeš v budoucnu přidat <Navbar /> */}
        {children}
        {/* Tady můžeš v budoucnu přidat <Footer /> */}
        <SpeedInsights/>
      </body>
    </html>
  );
}