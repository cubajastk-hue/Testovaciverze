import { client } from "../../../tina/__generated__/client";
import { PageComp } from "../PageComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const res = await client.queries.page({ relativePath: `${slug}.mdx` });

  return (
    <PageComp 
      data={JSON.parse(JSON.stringify(res.data))} 
      query={res.query} 
      variables={res.variables} 
    />
  );
}