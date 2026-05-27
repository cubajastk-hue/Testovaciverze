"use client";

// Základní import Tina usage //
import Image from "next/image";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// Vezme všechna data z Tiny, aby se to pak mohlo aplikovat //
export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // 1. Získáme vybranou barvu z Tiny, nebo dáme výchozí bílou
  const currentBgColor = data.page?.outerBgColor || "#ffffff";

  return (
    // Barva pozadí //
    <div 
      style={{ backgroundColor: currentBgColor }}
      className="min-h-screen w-full transition-colors duration-500"
    >
      {/* Hezké nastavení textu */}
      <main className="flex min-h-screen flex-col items-center p-24 mx-auto max-w-4xl text-slate-900">
        
        {/* Hlavní nadpis stránky */}
        <h1 
          data-tina-field={tinaField(data.page, "title")}
          className="text-6xl font-black mb-12 text-center"
        >
          {data.page?.title}
        </h1>
        
        {/* Popisek pod nadpisem */}
        <p
          data-tina-field={tinaField(data.page, "description")}
          className="text-xl text-slate-600 max-w-prose text-center mb-12"
        >
          {data.page?.description}
        </p>

        {/* Kontejner pro bloky, které můžeme kdykoli přidat */}
        <div className="w-full max-w-3xl space-y-12">
          {data.page?.blocks?.map((block: any, i: number) => {
            if (!block) return null;

            switch (block.__typename) {
              // 1. Nadpis //
              case "PageBlocksHeading":
                return (
                  <h2 
                    key={i} 
                    data-tina-field={tinaField(block, "text")} 
                    className="text-4xl font-bold text-slate-900"
                  >
                    {block.text}
                  </h2>
                );

              // 2. Textový obsah //
              case "PageBlocksContent":
                return (
                  <div 
                    key={i} 
                    data-tina-field={tinaField(block, "body")} 
                    className="prose prose-slate prose-lg max-w-none text-slate-800 opacity-90"
                  >
                    <TinaMarkdown content={block.body} />
                  </div>
                );

              // 3. Obrázek, musíme vylepšit *nefunkční* //
              case "PageBlocksImage":
                return (
                  <figure key={i} className="w-full">
                    <Image 
                      data-tina-field={tinaField(block, "url")}
                      src={block.url} 
                      alt={block.caption || ""}
                      width={800}
                      height={600}
                      className="rounded-2xl w-full shadow-2xl border border-slate-200" 
                    />
                    {block.caption && (
                      <figcaption 
                        data-tina-field={tinaField(block, "caption")}
                        className="text-center italic mt-4 text-slate-500 opacity-80"
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              // 4. Tlačítko //
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
// Myslím si, že když nic nebude vybrané, tak se to tam vrátí, a nic se jiného nezobrazí //
              default:
                return null;
            }
          })}
        </div>
      </main>
    </div>
  );
}