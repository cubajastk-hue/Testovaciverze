import { client } from "../../../tina/__generated__/client";
import { PageComponents } from "../PageComponents";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    // 🚀 FIX: Zpět na .mdx
    const res = await client.queries.page({ relativePath: `${params.slug}.mdx` });
    return <PageComponents data={res.data} />;
  } catch (error) {
    console.error(`Tina Cloud chyba na podstránce ${params.slug}, podhazuji fallback:`, error);
    
    const fallbackData = {
      page: {
        blocks: []
      }
    };
    
    return <PageComponents data={fallbackData} />;
  }
}