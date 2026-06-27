import { client } from "../../../tina/__generated__/client";
import { PageComponents } from "../PageComponents";

// Vynutíme dynamické načítání
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    // Pokusíme se načíst data pro konkrétní podstránku podle URL (slug)
    const res = await client.queries.page({ relativePath: `${params.slug}.mdx` });
    return <PageComponents data={res.data} />;
  } catch (error) {
    console.error(`Tina Cloud chyba na podstránce ${params.slug}, podhazuji fallback:`, error);
    
    // Fallback data, aby Vercel nehodil Application Error
    const fallbackData = {
      page: {
        blocks: []
      }
    };
    
    return <PageComponents data={fallbackData} />;
  }
}