import type { Metadata } from "next";
import "./globals.css"; 

// To co je úplně tahoře v tabu //
export const metadata: Metadata = {
  title: "Můj minimalistický web",
};

// Doplnit //
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      {/* OPRAVA: Přidali jsme bg-[var(--page-bg)] do className, aby Tailwind v4 věděl, že se tu mění barva */}
      <body className="antialiased selection:bg-gray-200">
        {/* Tady můžeš v budoucnu přidat <Navbar /> */}
        {children}
        {/* Tady můžeš v budoucnu přidat <Footer /> */}
      </body>
    </html>
  );
}