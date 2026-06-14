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

  // Společná logika pro výpočet všech pozic, mezer a stylů
  const getCustomStyles = (block: any) => {
    const isCustom = block.align === "custom";
    
    return {
      color: block.textColor || "inherit",
      fontSize: block.fontSize ? `${block.fontSize}px` : "inherit",
      fontWeight: block.fontWeight || "inherit",
      textAlign: isCustom ? "left" : (block.align as any) || "left",

      // PADDING (Vnitřní prostor)
      paddingTop: block.pt ? `${block.pt}px` : "0px",
      paddingBottom: block.pb ? `${block.pb}px` : "0px",
      paddingLeft: block.pl ? `${block.pl}px` : "0px",
      paddingRight: block.pr ? `${block.pr}px` : "0px",

      // MARGIN (Vnější odsazení)
      marginTop: block.mt ? `${block.mt}px` : "0px",
      marginBottom: block.mb ? `${block.mb}px` : "0px",
      marginLeft: isCustom ? `${block.ml || 0}px` : (block.align === "center" ? "auto" : "0px"),
      marginRight: isCustom ? `${block.mr || 0}px` : (block.align === "center" ? "auto" : "0px"),
    };
  };

  // Pomocná funkce pro flexboxové vyrovnání kontejnerů do stran
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
                </div>
              );

            case "PageBlocksHero":
              return (
                <section key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-6xl w-full mx-auto px-4">
                  <h1 data-tina-field={tinaField(block, "heading")} className="text-6xl font-black tracking-tight">{block.heading}</h1>
                  {block.subheading && <p data-tina-field={tinaField(block, "subheading")} className="text-xl opacity-80 mt-4 leading-relaxed">{block.subheading}</p>}
                </section>
              );

            case "PageBlocksHeading":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-4xl w-full mx-auto px-4">
                   <h2 data-tina-field={tinaField(block, "text")} className="text-4xl font-bold tracking-tight">{block.text}</h2>
                </div>
              );

            case "PageBlocksContent":
              return (
                <div key={i} data-tina-field={tinaField(block)} style={styles as any} className="max-w-4xl w-full mx-auto px-4 prose prose-slate prose-lg">
                   <div data-tina-field={tinaField(block, "body")}>
                     <TinaMarkdown content={block.body} />
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
                  className={`w-full max-w-4xl mx-auto flex ${getFlexJustify(block.align || "center")}`}
                >
                  <figure className="flex flex-col items-center max-w-full">
                    {block.url ? (
                      <img 
                        data-tina-field={tinaField(block, "url")}
                        src={block.url} 
                        alt={block.caption || "Obrázek z webu"}
                        style={{ borderRadius: block.borderRadius ? `${block.borderRadius}px` : "0px" }}
                        className="shadow-xl max-w-full h-auto object-contain" 
                      />
                    ) : (
                      <div className="w-[600px] max-w-full h-64 bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 font-medium text-sm">
                        Klikni sem a nahraj obrázek v bočním panelu
                      </div>
                    )}
                    {block.caption && (
                      <figcaption data-tina-field={tinaField(block, "caption")} className="italic mt-3 text-sm text-slate-500">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
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
                  className="w-full max-w-4xl mx-auto px-4"
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
                </div>
              );

            default: return null;
          }
        })}
      </main>
    </div>
  );
}