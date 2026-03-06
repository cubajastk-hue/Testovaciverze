// @ts-nocheck
"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function PageComponents(props: any) {
  const { data } = useTina(props);

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-5xl font-black text-black mb-10 tracking-tight"
      >
        {data.page.title}
      </h1>

      <div className="space-y-12">
        {data.page.blocks?.map((block: any, i: number) => {
          if (!block) return null;

          switch (block.__typename) {
            case "PageBlocksHeading":
              return (
                <h2 key={i} data-tina-field={tinaField(block, "text")} className="text-3xl font-bold">
                  {block.text}
                </h2>
              );

            case "PageBlocksContent":
              return (
                <div key={i} data-tina-field={tinaField(block, "body")} className="prose max-w-none text-gray-800">
                  <TinaMarkdown content={block.body} />
                </div>
              );

            case "PageBlocksImage":
              // Nastavení šířky podle výběru v editoru
              const sizeClass = 
                block.size === "small" ? "max-w-sm" : 
                block.size === "medium" ? "max-w-2xl" : "max-w-full";
              
              return (
                <figure key={i} className={`my-10 mx-auto ${sizeClass}`}>
                  <img 
                    data-tina-field={tinaField(block, "url")}
                    src={block.url || ""} 
                    className="rounded-lg w-full shadow-lg" 
                  />
                  {block.caption && (
                    <figcaption data-tina-field={tinaField(block, "caption")} className="text-center italic mt-2 text-gray-500">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}