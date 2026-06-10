import { client } from "../../../tina/__generated__/client"; // pozor na správný počet "../" podle hloubky složky
import { PageComponents } from "../PageComponents"; // uprav cestu, aby správně importovala PageComponents

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  // Počkáme na vytažení slug (názvu stránky, např. "o-nas") z URL
  const { slug } = await params;

  // Dynamicky načteme mdx soubor podle toho, co je v URL
  const res = await client.queries.page({ relativePath: `${slug}.mdx` });

  // Vykreslíme úplně stejné plátno, ale s daty pro tuto konkrétní stránku
  return (
    <PageComponents
      data={JSON.parse(JSON.stringify(res.data))}
      query={res.query}
      variables={res.variables}
    />
  );
}