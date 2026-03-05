import type { Metadata } from "next";
import "./globals.css";

// Metadata pro tvůj web - přepiš si podle sebe
export const metadata: Metadata = {
  title: "Můj minimalistický web",
  description: "Web spravovaný přes TinaCMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs"> {/* Změněno na češtinu */}
      <body className="antialiased selection:bg-gray-200">
        {/* Tady můžeš v budoucnu přidat <Navbar /> */}
        {children}
        {/* Tady můžeš v budoucnu přidat <Footer /> */}
      </body>
    </html>
  );
}