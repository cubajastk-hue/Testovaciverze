import { client } from "../../tina/__generated__/client";
import { PageComponents } from "./PageComponents"; // vytvoříme za vteřinu

export default async function Home() {
  const res = await client.queries.page({ relativePath: "home.mdx" });

  return (
    <PageComponents
      data={JSON.parse(JSON.stringify(res.data))}
      query={res.query}
      variables={res.variables}
    />
  );
}