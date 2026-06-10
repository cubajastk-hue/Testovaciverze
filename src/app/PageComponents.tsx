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
  const mainAlign = data.page?.titleAlignment || "center";

  // Pomocná funkce pro vygenerování inline stylů na základě dat z Tiny
  const getCustomStyles = (block: any) => {
    return {
      textAlign: block?.align || undefined,
      color: block?.textColor || undefined,
      fontSize: block?.fontSize ? `${block.fontSize}px` : undefined,
      fontWeight: block?.fontWeight || undefined,
      fontStyle: block?.italic ? "italic" : undefined,
      marginTop: block?.marginTop ? `${block.marginTop}px` : undefined,
      marginBottom: block?.marginBottom ? `${block.marginBottom}px` : undefined,
      paddingLeft: block?.paddingLeft ? `${block.paddingLeft}px` : undefined,
      paddingRight: block?.paddingRight ? `${block.paddingRight}px` : undefined,
    };
  };

  return (
    <div 
      style={{ backgroundColor: currentBgColor }}
      className="min-h-screen w-full transition-colors duration-500 flex flex-col"
    >
      {/* Hlavička stránky */}
      <div 
        style={{ textAlign: mainAlign as any }} 
        className="flex flex-col pt-12 px-4 mx-auto max-w-4xl text-slate-900 w-full"
      >
        <h1 data-tina-field={tinaField(data.page, "title")} className="text-6xl font-black mb-6">
          {data.page?.title}
        </h1>
        <p data-tina-field={tinaField(data.page, "description")} className="text-xl text-slate-600 max-w-prose mb-12 mx-auto">
          {data.page?.description}
        </p>
      </div>

      {/* RENDER BLOKŮ S EDITOVATELNÝMI PIXELY A STYLY */}
      <div className="w-full flex flex-col mb-20">
        {data.page?.blocks?.map((block: any, i: number) => {
          if (!block) return null;

          const customStyle = getCustomStyles(block);

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
              return (
                <section key={i} data-tina-field={tinaField(block)} style={customStyle as any} className="w-full max-w-5xl mx-auto px-4">
                  <h2 data-tina-field={tinaField(block, "heading")} className="text-5xl font-black mb-4 text-slate-900" style={{ color: 'inherit', fontStyle: 'inherit' }}>
                    {block.heading}
                  </h2>
                  <p data-tina-field={tinaField(block, "subheading")} className="text-xl opacity-80 text-slate-700" style={{ color: 'inherit' }}>
                    {block.subheading}
                  </p>
                </section>
              );

            case "PageBlocksHeading":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={customStyle as any} className="mx-auto w-full max-w-3xl">
                  <h2 data-tina-field={tinaField(block, "text")} className="text-4xl font-bold text-slate-900" style={{ color: 'inherit', fontStyle: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>
                    {block.text}
                  </h2>
                </div>
              );

            case "PageBlocksContent":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={customStyle as any} className="mx-auto w-full max-w-3xl prose prose-slate prose-lg">
                  <div data-tina-field={tinaField(block, "body")} style={{ color: 'inherit', fontStyle: 'inherit', textAlign: 'inherit' }}>
                    <TinaMarkdown content={block.body} />
                  </div>
                </div>
              );

            case "PageBlocksImage":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block)} 
                  style={{ marginTop: `${block.marginTop || 0}px`, marginBottom: `${block.marginBottom || 0}px` }} 
                  className="mx-auto w-full max-w-3xl px-6 flex justify-center"
                >
                  <figure className="w-full flex flex-col items-center">
                    <Image 
                      data-tina-field={tinaField(block, "url")}
                      src={block.url || ""} 
                      alt={block.caption || ""}
                      width={800}
                      height={600}
                      style={{ borderRadius: block.borderRadius ? `${block.borderRadius}px` : "16px" }}
                      className="shadow-2xl border border-slate-200" 
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
              return (
                <div key={i} data-tina-field={tinaField(block)} style={customStyle as any} className="w-full flex mx-auto max-w-3xl">
                  <a 
                    data-tina-field={tinaField(block, "title")}
                    href={block.link || "#"} 
                    style={{
                      backgroundColor: block.btnBgColor || "#2563eb",
                      color: block.btnTextColor || "#ffffff",
                      borderRadius: block.borderRadius ? `${block.borderRadius}px` : "12px"
                    }}
                    className="px-10 py-4 font-bold transition-all transform hover:scale-105 shadow-lg block mx-auto inline-block"
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