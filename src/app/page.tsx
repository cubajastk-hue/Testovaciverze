import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export default async function Home() {
  // Načtení dat ze souboru content/pages/home.mdx //
  const res = await client.queries.page({ relativePath: "home.mdx" });


  // Vezme všechna data z Tiny a společně s css z Page components je naskládá na stránku //
  return (
    <PageComponents
      data={JSON.parse(JSON.stringify(res.data))}
      query={res.query}
      variables={res.variables}
    />
  );
}