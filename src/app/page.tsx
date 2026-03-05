import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents";

export default async function Home() {
  // Načtení dat ze souboru content/pages/home.mdx
  const res = await client.queries.page({ relativePath: "home.mdx" });

  return (
    <main className="min-h-screen bg-white">
      {/* Container pro vycentrování obsahu a horní odsazení */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        <PageComponents
          data={JSON.parse(JSON.stringify(res.data))}
          query={res.query}
          variables={res.variables}
        />
      </div>
    </main>
  );
}