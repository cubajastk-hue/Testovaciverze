import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    // 🚀 FIX: Změněno z home.mdx na home.json
    const res = await client.queries.page({ relativePath: "home.json" });
    return <PageComponents data={res.data} />;
  } catch (error) {
    console.error("Tina Cloud chyba na Homepage, podhazuji fallback:", error);
    
    const fallbackData = {
      page: {
        blocks: []
      }
    };
    
    return <PageComponents data={fallbackData} />;
  }
}