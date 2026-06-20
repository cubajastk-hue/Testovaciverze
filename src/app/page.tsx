import { client } from "../../tina/__generated__/client";
import { PageComp } from "./PageComponents";

export default async function Home() {
  // Načtení dat ČISTĚ ze souboru content/pages/home.mdx
  const res = await client.queries.page({ relativePath: "home.mdx" });

  // Vezme data z Tiny a pošle je do komponenty PageComp
  return (
    <PageComp data={JSON.parse(JSON.stringify(res.data))} />
  );
}