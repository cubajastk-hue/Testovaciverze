"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageQuery } from "../../tina/__generated__/types";

interface PageProps {
  data: PageQuery;
  query: string;
  variables: {
    relativePath: string;
  };
}

export function PageComponents(props: PageProps) {
  const { data } = useTina(props);

  return (
    <article>
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-5xl font-black text-black mb-10 tracking-tight"
      >
        {data.page.title}
      </h1>

      <div 
        data-tina-field={tinaField(data.page, "body")}
        className="prose prose-slate prose-lg text-gray-800"
      >
        <TinaMarkdown content={data.page.body} />
      </div>
    </article>
  );
}