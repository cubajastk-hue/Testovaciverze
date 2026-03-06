"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function PageComponents(props: any) {
  const { data } = useTina<any>(props);

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      {/* 1. HLAVNÍ NADPIS */}
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-5xl font-black text-black mb-10 tracking-tight"
      >
        {data.page.title}
      </h1>

      {/* 2. HERO OBRÁZEK */}
      {data.page.heroImage && (
        <div 
          data-tina-field={tinaField(data.page, "heroImage")}
          className="mb-10 overflow-hidden rounded-xl shadow-lg border border-gray-100"
        >
          <img src={data.page.heroImage} alt="" className="w-full h-auto" />
        </div>
      )}

      {/* 3. DYNAMICKÉ BLOKY */}
      <div className="space-y-12">
        {data.page.blocks?.map((block: any, i: number) => {
          if (!block) return null;

          switch (block.__typename) {
            case "PageBlocksHeading":
              return (
                <h2 
                  key={i} 
                  data-tina-field={tinaField(block, "text")}
                  className="text-3xl font-bold text-gray-900 mt-12"
                >
                  {block.text}
                </h2>
              );

            case "PageBlocksContent":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block, "body")}
                  className="prose prose-lg max-w-none text-gray-800"
                >
                  <TinaMarkdown content={block.body} />
                </div>
              );

            case "PageBlocksImage":
              // Logika pro velikost obrázku z tvého nového configu
              const sizeClass = 
                block.size === "small" ? "max-w-sm" : 
                block.size === "medium" ? "max-w-2xl" : 
                "max-w-full";

              return (
                <figure 
                  key={i} 
                  data-tina-field={tinaField(block, "url")}
                  className={`my-10 mx-auto ${sizeClass}`}
                >
                  <img src={(block as any).url || ""} alt="" className="rounded-lg w-full" />
                  {block.caption && (
                    <figcaption 
                      data-tina-field={tinaField(block, "caption")}
                      className="text-center text-sm text-gray-500 mt-3 italic"
                    >
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case "PageBlocksCta":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block, "text")}
                  className="flex justify-center my-8"
                >
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