import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const res = await client.queries.page({ relativePath: "home.mdx" });
    return <PageComponents data={res.data} />;
  } catch (error) {
    console.error("Tina Cloud chyba na Homepage:", error);
    return <PageComponents data={{ page: { blocks: [] } }} />;
  }
}