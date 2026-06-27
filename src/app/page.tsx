import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

// Vynutíme dynamické načítání pro jistotu
export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    // Pokusíme se načíst data pro hlavní stránku
    const res = await client.queries.page({ relativePath: "home.mdx" });
    return <PageComponents data={res.data} />;
  } catch (error) {
    console.error("Tina Cloud chyba na Homepage, podhazuji fallback:", error);
    
    // Fallback data, aby Vercel nehodil Application Error
    const fallbackData = {
      page: {
        blocks: []
      }
    };
    
    return <PageComponents data={fallbackData} />;
  }
}