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
    <article className="max-w-2xl mx-auto py-12 px-6">
      {/* NADPIS */}
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-5xl font-black text-black mb-10 tracking-tight"
      >
        {data.page.title}
      </h1>

      {/* OBRÁZEK - Přidáno zde */}
      {data.page.heroImage && (
        <div 
          className="mb-10 overflow-hidden rounded-xl shadow-lg border border-gray-100"
          data-tina-field={tinaField(data.page, "heroImage")}
        >
          <img 
            src={data.page.heroImage} 
            alt={data.page.title} 
            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      {/* OBSAH */}
      <div 
        data-tina-field={tinaField(data.page, "body")}
        className="prose prose-slate prose-lg text-gray-800 leading-relaxed"
      >
        <TinaMarkdown content={data.page.body} />
      </div>
    </article>
  );
}