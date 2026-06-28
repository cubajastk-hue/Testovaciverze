import { client } from "../../../tina/__generated__/client";
import { PageComponents } from "../PageComponents";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const res = await client.queries.page({ relativePath: `${params.slug}.mdx` });
    
    // 🚀 Znovu předáváme komplet {...res}
    return <PageComponents {...res} />;
  } catch (error) {
    console.error(`Tina Cloud chyba na podstránce ${params.slug}:`, error);
    return <PageComponents data={{ page: { blocks: [] } }} query="" variables={{}} />;
  }
}