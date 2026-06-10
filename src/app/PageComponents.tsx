"use client";

import Image from "next/image";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const currentBgColor = data.page?.outerBgColor || "#ffffff";
  const mainAlign = data.page?.titleAlignment || "items-center text-center";

  return (
    <div 
      style={{ backgroundColor: currentBgColor }}
      className="min-h-screen w-full transition-colors duration-500 flex flex-col"
    >
      {/* Hlavní nadpis a popisek stránky s volitelným zarovnáním */}
      <div className={`flex flex-col pt-12 px-4 mx-auto max-w-4xl text-slate-900 w-full ${mainAlign}`}>
        <h1 
          data-tina-field={tinaField(data.page, "title")}
          className="text-6xl font-black mb-6"
        >
          {data.page?.title}
        </h1>
        
        <p
          data-tina-field={tinaField(data.page, "description")}
          className="text-xl text-slate-600 max-w-prose mb-12"
        >
          {data.page?.description}
        </p>
      </div>

      {/* KONTEJNER PRO POHYBLIVÉ BLOKY */}
      <div className="w-full flex flex-col space-y-6 mb-20">
        {data.page?.blocks?.map((block: any, i: number) => {
          if (!block) return null;

          switch (block.__typename) {
            case "PageBlocksNavbar":
              return (
                <div key={i} data-tina-field={tinaField(block)} className="w-full">
                  <nav className="mx-auto max-w-5xl m-4 p-6 flex justify-between items-center bg-white/20 backdrop-blur-md border border-black/5 rounded-2xl shadow-sm">
                    <div data-tina-field={tinaField(block, "logoText")} className="text-2xl font-bold text-slate-950">
                      {block.logoText || "Logo"}
                    </div>
                    <ul className="flex gap-6">
                      {block.links?.map((link: any, j: number) => (
                        <li key={j} data-tina-field={tinaField(link)}>
                          <Link href={link.url || "#"} className="font-medium text-slate-800 hover:text-slate-950 transition-colors">
                            {link.label || "Odkaz"}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              );

            case "PageBlocksHero":
              const heroAlign = block.align || "items-center text-center";
              return (
                <section key={i} data-tina-field={tinaField(block)} className={`flex flex-col justify-center py-16 px-4 mx-auto w-full max-w-5xl ${heroAlign}`}>
                  <h2 data-tina-field={tinaField(block, "heading")} className="text-5xl font-black mb-4 text-slate-900">
                    {block.heading}
                  </h2>
                  <p data-tina-field={tinaField(block, "subheading")} className="text-xl opacity-80 text-slate-700">
                    {block.subheading}
                  </p>
                </section>
              );

            case "PageBlocksHeading":
              const headingAlign = block.align || "text-left";
              return (
                <div key={i} data-tina-field={tinaField(block)} className="mx-auto w-full max-w-3xl px-6">
                  <h2 data-tina-field={tinaField(block, "text")} className={`text-4xl font-bold text-slate-900 ${headingAlign}`}>
                    {block.text}
                  </h2>
                </div>
              );

            case "PageBlocksContent":
              const contentAlign = block.align || "text-left";
              return (
                <div key={i} data-tina-field={tinaField(block)} className="mx-auto w-full max-w-3xl px-6">
                  <div data-tina-field={tinaField(block, "body")} className={`prose prose-slate prose-lg max-w-none text-slate-800 opacity-90 ${contentAlign}`}>
                    <TinaMarkdown content={block.body} />
                  </div>
                </div>
              );

            case "PageBlocksImage":
              const imageAlign = block.align || "justify-center text-center";
              return (
                <div key={i} data-tina-field={tinaField(block)} className="mx-auto w-full max-w-3xl px-6">
                  <figure className={`w-full flex flex-col ${imageAlign}`}>
                    <Image 
                      data-tina-field={tinaField(block, "url")}
                      src={block.url || ""} 
                      alt={block.caption || ""}
                      width={800}
                      height={600}
                      className="rounded-2xl shadow-2xl border border-slate-200" 
                    />
                    {block.caption && (
                      <figcaption data-tina-field={tinaField(block, "caption")} className="italic mt-4 text-slate-500 opacity-80">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              );

            case "PageBlocksCta":
              const ctaAlign = block.align || "justify-center";
              return (
                <div key={i} data-tina-field={tinaField(block)} className={`w-full flex py-4 mx-auto max-w-3xl px-6 ${ctaAlign}`}>
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
    </div>
  );
}