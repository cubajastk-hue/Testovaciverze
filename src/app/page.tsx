import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    // res obsahuje data, query i variables
    const res = await client.queries.page({ relativePath: "home.mdx" });
    
    // 🚀 Předáváme celý objekt 'res' (rozložený přes {...res})
    return <PageComponents {...res} />;
  } catch (error) {
    console.error("Tina Cloud chyba na Homepage:", error);
    // Bezpečný fallback, když se něco pokazí
    return <PageComponents data={{ page: { blocks: [] } }} query="" variables={{}} />;
  }
}