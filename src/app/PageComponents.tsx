"use client"; // 🌟 TENTO ŘÁDEK TADY CHYBĚL A OPRAVÍ BUILD!

import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";

// 1. Komponenta pro barvu písma
const ColorText = (props: { text: string; color?: string }) => {
  return <span style={{ color: props.color || "inherit" }}>{props.text}</span>;
};

// 2. Komponenta pro zvýraznění textu
const HighlightText = (props: { text: string; bgColor?: string; textColor?: string }) => {
  return (
    <span
      style={{
        backgroundColor: props.bgColor || "yellow",
        color: props.textColor || "inherit",
        padding: "0.2em 0.4em",
        borderRadius: "3px",
      }}
    >
      {props.text}
    </span>
  );
};

// Registrace šablon pro TinaMarkdown
const markdownComponents = {
  ColorText: ColorText,
  HighlightText: HighlightText,
};

// Pomocná funkce pro vygenerování inline stylů z konfigurace okrajů a barev
const getBlockStyles = (block: any) => {
  return {
    textAlign: block.align && block.align !== "custom" ? (block.align as any) : undefined,
    color: block.textColor || undefined,
    fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
    fontWeight: block.fontWeight || undefined,
    // Vnitřní okraje (Padding)
    paddingTop: block.pt ? `${block.pt}px` : undefined,
    paddingBottom: block.pb ? `${block.pb}px` : undefined,
    paddingLeft: block.pl ? `${block.pl}px` : undefined,
    paddingRight: block.pr ? `${block.pr}px` : undefined,
    // Vnější okraje (Margin)
    marginTop: block.mt ? `${block.mt}px` : undefined,
    marginBottom: block.mb ? `${block.mb}px` : undefined,
    marginLeft: block.ml ? `${block.ml}px` : undefined,
    marginRight: block.mr ? `${block.mr}px` : undefined,
  };
};

interface PageCompProps {
  data: any;
  query: string;
  variables: any;
}

export function PageComp(props: PageCompProps) {
  // Hook useTina se stará o to, aby se změny v adminu okamžitě projevovaly na webu
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const blocks = data?.page?.blocks || [];
  const outerBgColor = data?.page?.outerBgColor || "transparent";

  return (
    <div style={{ backgroundColor: outerBgColor, minHeight: "100vh" }}>
      {blocks.map((block: any, index: number) => {
        const styles = getBlockStyles(block);

        switch (block.__typename) {
          // 1. NAVBAR
          case "PageBlocksNavbar":
            return (
              <nav 
                key={index} 
                data-tina-field={block} 
                style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div className="logo">
                  <TinaMarkdown content={block.logoText} components={markdownComponents} />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {block.links?.map((link: any, i: number) => (
                    <a key={i} href={link.url} style={{ textDecoration: "none" }}>
                      <TinaMarkdown content={link.label} components={markdownComponents} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          // 2. HERO BLOK
          case "PageBlocksHero":
            return (
              <section 
                key={index} 
                data-tina-field={block} 
                style={{ ...styles, display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {block.heading && (
                  <div style={{ fontSize: "2em" }}>
                    <TinaMarkdown content={block.heading} components={markdownComponents} />
                  </div>
                )}
                {block.subheading && (
                  <div style={{ fontSize: "1.5em", opacity: 0.8 }}>
                    <TinaMarkdown content={block.subheading} components={markdownComponents} />
                  </div>
                )}
                {block.body && <TinaMarkdown content={block.body} components={markdownComponents} />}
              </section>
            );

          // 3. HEADING BLOK (H2)
          case "PageBlocksHeading":
            return (
              <h2 key={index} data-tina-field={block} style={styles}>
                <TinaMarkdown content={block.text} components={markdownComponents} />
              </h2>
            );

          // 4. CONTENT BLOK
          case "PageBlocksContent":
            return (
              <div key={index} data-tina-field={block} style={styles}>
                <TinaMarkdown content={block.body} components={markdownComponents} />
              </div>
            );

          // 5. CTA TLAČÍTKO
          case "PageBlocksCta":
            return (
              <div 
                key={index} 
                data-tina-field={block} 
                style={{ textAlign: block.align && block.align !== "custom" ? (block.align as any) : "center", marginTop: block.mt ? `${block.mt}px` : undefined, marginBottom: block.mb ? `${block.mb}px` : undefined }}
              >
                <a
                  href={block.link}
                  style={{
                    display: "inline-block",
                    backgroundColor: block.btnBgColor || "#2563eb",
                    color: block.btnTextColor || "#ffffff",
                    fontSize: block.fontSize ? `${block.fontSize}px` : "16px",
                    fontWeight: block.fontWeight || "700",
                    paddingTop: block.pt ? `${block.pt}px` : "14px",
                    paddingBottom: block.pb ? `${block.pb}px` : "14px",
                    paddingLeft: block.pl ? `${block.pl}px` : "28px",
                    paddingRight: block.pr ? `${block.pr}px` : "28px",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  <TinaMarkdown content={block.title} components={markdownComponents} />
                </a>
              </div>
            );

          // 6. OBRÁZEK
          case "PageBlocksImage":
            return (
              <div 
                key={index} 
                data-tina-field={block} 
                style={{ textAlign: block.align && block.align !== "custom" ? (block.align as any) : "center", marginTop: block.mt ? `${block.mt}px` : undefined, marginBottom: block.mb ? `${block.mb}px` : undefined }}
              >
                {block.url && (
                  <img
                    src={block.url}
                    alt={block.caption || ""}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: block.borderRadius ? `${block.borderRadius}px` : "0px",
                      paddingLeft: block.pl ? `${block.pl}px` : undefined,
                      paddingRight: block.pr ? `${block.pr}px` : undefined,
                    }}
                  />
                )}
                {block.caption && <p style={{ fontStyle: "italic", fontSize: "0.9em", marginTop: "0.5rem" }}>{block.caption}</p>}
                {block.body && (
                  <div style={{ marginTop: "1rem" }}>
                    <TinaMarkdown content={block.body} components={markdownComponents} />
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}