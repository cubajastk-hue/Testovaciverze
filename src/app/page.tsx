import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export default async function Home() {
  // Načtení dat ze souboru content/pages/home.mdx
  const res = await client.queries.page({ relativePath: "home.mdx" });

  return (
    <PageComponents
      data={JSON.parse(JSON.stringify(res.data))}
      query={res.query}
      variables={res.variables}
    />
  );
}