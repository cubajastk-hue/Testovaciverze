"use client";
// @ts-nocheck
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-900 text-white p-24">
      {/* Hlavní nadpis stránky */}
      <h1 
        data-tina-field={tinaField(data.page, "title")}
        className="text-6xl font-black mb-12 text-center"
      >
        {data.page.title}
      </h1>

      {/* Kontejner pro dynamické bloky */}
      <div className="w-full max-w-3xl space-y-12">
        {data.page.blocks?.map((block: any, i: number) => {
          if (!block) return null;

          switch (block.__typename) {
            // 1. BLOK: NADPIS
            case "PageBlocksHeading":
              return (
                <h2 
                  key={i} 
                  data-tina-field={tinaField(block, "text")} 
                  className="text-4xl font-bold"
                >
                  {block.text}
                </h2>
              );

            // 2. BLOK: TEXTOVÝ OBSAH (Rich Text)
            case "PageBlocksContent":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block, "body")} 
                  className="prose prose-invert prose-lg max-w-none text-white opacity-90"
                >
                  <TinaMarkdown content={block.body} />
                </div>
              );

            // 3. BLOK: OBRÁZEK
            case "PageBlocksImage":
              return (
                <figure key={i} className="w-full">
                  <Image 
                    data-tina-field={tinaField(block, "url")}
                    src={block.url} 
                    alt={block.caption || ""}
                    width={800}
                    height={600}
                    className="rounded-2xl w-full shadow-2xl border border-slate-700" 
                  />
                  {block.caption && (
                    <figcaption 
                      data-tina-field={tinaField(block, "caption")}
                      className="text-center italic mt-4 opacity-60"
                    >
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );

            // 4. BLOK: TLAČÍTKO (CTA)
            case "PageBlocksCta":
              return (
                <div key={i} className="flex justify-center py-4">
                  <a 
                    data-tina-field={tinaField(block, "title")}
                    href={block.link || "#"} 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    {block.title || "Tlačítko"}
                  </a>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}