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
      {/* 1. HLAVNÍ NADPIS */}
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-5xl font-black text-black mb-10 tracking-tight"
      >
        {data.page.title}
      </h1>

      {/* 2. HERO OBRÁZEK (pokud existuje) */}
      {data.page.heroImage && (
        <div className="mb-10 overflow-hidden rounded-xl shadow-lg border border-gray-100">
          <img src={data.page.heroImage} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* 3. STARÝ OBSAH (pokud ho chceš nechat) */}
      {data.page.body && (
        <div className="prose mb-10">
          <TinaMarkdown content={data.page.body} />
        </div>
      )}

      {/* 4. DYNAMICKÉ BLOKY */}
      <div className="space-y-12">
        {data.page.blocks?.map((block, i) => {
          if (!block) return null;

          switch (block.__typename) {
            case "PageBlocksHeading":
              return (
                <h2 key={i} className="text-3xl font-bold text-gray-900 mt-12">
                  {block.text}
                </h2>
              );

            case "PageBlocksContent":
              return (
                <div key={i} className="prose prose-lg max-w-none text-gray-800">
                  <TinaMarkdown content={block.body} />
                </div>
              );

            case "PageBlocksImage":
              return (
                <figure key={i} className="my-10">
                  <img src={block.url || ""} alt="" className="rounded-lg w-full" />
                  {block.caption && (
                    <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case "PageBlocksCta":
              return (
                <div key={i} className="flex justify-center my-8">
                  <a
                    href={block.link || "#"}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                  >
                    {block.text}
                  </a>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}