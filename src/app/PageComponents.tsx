"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  const getCustomStyles = (block: any) => {
    const isCustom = block.align === "custom";
    return {
      color: block.textColor || "inherit",
      fontSize: block.fontSize ? `${block.fontSize}px` : "inherit",
      fontWeight: block.fontWeight || "inherit",
      textAlign: isCustom ? "left" : (block.align as any) || "left",
      paddingTop: block.pt ? `${block.pt}px` : "0px",
      paddingBottom: block.pb ? `${block.pb}px` : "0px",
      paddingLeft: block.pl ? `${block.pl}px` : "0px",
      paddingRight: block.pr ? `${block.pr}px` : "0px",
      marginTop: block.mt ? `${block.mt}px` : "0px",
      marginBottom: block.mb ? `${block.mb}px` : "0px",
      marginLeft: isCustom ? `${block.ml || 0}px` : (block.align === "center" ? "auto" : "0px"),
      marginRight: isCustom ? `${block.mr || 0}px` : (block.align === "center" ? "auto" : "0px"),
    };
  };

  const getFlexJustify = (align: string) => {
    if (align === "left") return "justify-start";
    if (align === "right") return "justify-end";
    return "justify-center";
  };

  return (
    <div style={{ backgroundColor: page.outerBgColor || "#ffffff", minHeight: "100vh" }} className="w-full transition-colors duration-300">
      <main className="w-full flex flex-col overflow-x-hidden">
        {page.blocks?.map((block: any, i: number) => {
          if (!block) return null;
          const styles = getCustomStyles(block);

          switch (block.__typename) {
            case "PageBlocksNavbar":
              return (
                <div key={i} data-tina-field={tinaField(block)} className="w-full bg-white/10 backdrop-blur border-b border-black/5">
                  <nav className="max-w-6xl mx-auto w-full flex justify-between items-center p-6">
                    <span data-tina-field={tinaField(block, "logoText")} className="font-black text-2xl text-slate-900">{block.logoText || "Logo"}</span>
                    <ul className="flex gap-6">
                      {block.links?.map((link:any, idx:number) => (
                        <li key={idx} data-tina-field={tinaField(link)}>
                          <Link href={link.url || "#"} className="font-medium text-slate-700 hover:text-black transition-colors">{link.label || "Odkaz"}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  {block.body && (
                    <div data-tina-field={tinaField(block, "body")} className="max-w-6xl mx-auto px-6 pb-4 prose prose-sm">
                      <TinaMarkdown content={block.body} />
                    </div>
                  )}
                </div>
              );

            case "PageBlocksHero":
              return (
                <section key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-6xl w-full mx-auto px-4">
                  {/* Hlavní nadpis jako Rich Text */}
                  {block.heading && (
                    <div data-tina-field={tinaField(block, "heading")} className="text-6xl font-black tracking-tight prose prose-h1:text-6xl max-w-none">
                      <TinaMarkdown content={block.heading} />
                    </div>
                  )}
                  {/* Podnadpis jako Rich Text */}
                  {block.subheading && (
                    <div data-tina-field={tinaField(block, "subheading")} className="text-xl opacity-80 mt-4 leading-relaxed prose max-w-none">
                      <TinaMarkdown content={block.subheading} />
                    </div>
                  )}
                  {block.body && (
                    <div data-tina-field={tinaField(block, "body")} className="mt-6 prose prose-slate max-w-none">
                      <TinaMarkdown content={block.body} />
                    </div>
                  )}
                </section>
              );

            case "PageBlocksHeading":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-4xl w-full mx-auto px-4">
                  {/* Nadpis H2 jako Rich Text */}
                  {block.text && (
                    <div data-tina-field={tinaField(block, "text")} className="text-4xl font-bold tracking-tight prose prose-h2:text-4xl max-w-none">
                      <TinaMarkdown content={block.text} />
                    </div>
                  )}
                </div>
              );

            case "PageBlocksContent":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-4xl w-full mx-auto px-4 prose prose-slate prose-lg">
                   <div data-tina-field={tinaField(block, "body")}>
                     {block.body && <TinaMarkdown content={block.body} />}
                   </div>
                </div>
              );

            case "PageBlocksImage":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block)} 
                  style={{ 
                    marginTop: styles.marginTop, 
                    marginBottom: styles.marginBottom,
                    paddingLeft: block.pl ? `${block.pl}px` : "0px",
                    paddingRight: block.pr ? `${block.pr}px` : "0px"
                  }} 
                  className="w-full max-w-4xl mx-auto flex flex-col items-center px-4"
                >
                  <figure className={`flex flex-col max-w-full ${getFlexJustify(block.align || "center")}`}>
                    {block.url ? (
                      <img 
                        data-tina-field={tinaField(block, "url")}
                        src={block.url} 
                        alt={block.caption || "Obrázek z webu"}
                        style={{ borderRadius: block.borderRadius ? `${block.borderRadius}px` : "0px" }}
                        className="shadow-xl max-w-full h-auto object-contain mx-auto" 
                      />
                    ) : (
                      <div className="w-[600px] max-w-full h-64 bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 font-medium text-sm mx-auto">
                        Klikni sem a nahraj obrázek v bočním panelu
                      </div>
                    )}
                    {block.caption && (
                      <figcaption data-tina-field={tinaField(block, "caption")} className="italic mt-3 text-sm text-slate-500 text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                  {block.body && (
                    <div data-tina-field={tinaField(block, "body")} className="mt-4 w-full prose prose-slate max-w-none">
                      <TinaMarkdown content={block.body} />
                    </div>
                  )}
                </div>
              );

            case "PageBlocksCta":
              return (
                <div 
                  key={i} 
                  data-tina-field={tinaField(block)} 
                  style={{
                    marginTop: styles.marginTop, 
                    marginBottom: styles.marginBottom,
                    marginLeft: styles.marginLeft,
                    marginRight: styles.marginRight,
                    textAlign: styles.textAlign as any
                  }} 
                  className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center"
                >
                  <Link 
                    data-tina-field={tinaField(block, "title")}
                    href={block.link || "#"} 
                    style={{
                      backgroundColor: block.btnBgColor || "#2563eb",
                      color: block.btnTextColor || "#ffffff",
                      paddingTop: styles.paddingTop || "16px",
                      paddingBottom: styles.paddingBottom || "16px",
                      paddingLeft: styles.paddingLeft || "32px",
                      paddingRight: styles.paddingRight || "32px",
                      fontSize: styles.fontSize,
                      fontWeight: styles.fontWeight,
                      display: "inline-block",
                      borderRadius: "12px"
                    }}
                    className="shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                  >
                    {block.title || "Tlačítko"}
                  </Link>
                  {block.body && (
                    <div data-tina-field={tinaField(block, "body")} className="mt-4 w-full prose prose-slate max-w-none text-center">
                      <TinaMarkdown content={block.body} />
                    </div>
                  )}
                </div>
              );

            default: return null;
          }
        })}
      </main>
    </div>
  );
}