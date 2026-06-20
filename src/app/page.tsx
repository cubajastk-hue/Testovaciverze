import { client } from "../../tina/__generated__/client";
import { PageComp } from "./PageComponents";

export default async function Home() {
  const res = await client.queries.page({ relativePath: "home.mdx" });

  return (
    <PageComp 
      data={JSON.parse(JSON.stringify(res.data))} 
      query={res.query} 
      variables={res.variables} 
    />
  );
}