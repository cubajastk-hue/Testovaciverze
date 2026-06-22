"use client";
import React from "react";
import { marked } from "marked";
import { useTina } from "tinacms/dist/react";

// Bezpečný a čistý převod markdownu na HTML s fallbackem
const RenderMarkdown = ({ text, label }: { text: any; label: string }) => {
  if (!text) return <span style={{ color: "#999", fontSize: "12px" }}>[Prázdné pole {label}]</span>;
  
  // Pokud by náhodou Tina poslala objekt místo stringu, převedeme ho na string
  const stringText = typeof text === "string" ? text : JSON.stringify(text);
  const rawHtml = marked(stringText) as string;
  
  return <span dangerouslySetInnerHTML={{ __html: rawHtml }} />;
};

export function PageComponents(props: { data: any; query: string; variables: any }) {
  // UseTina zajišťuje bleskurychlé živé změny přímo z administrace
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // Pomocný debug přímo v náhledu, kdyby byla celá data prázdná
  if (!data || !data.page || !data.page.blocks) {
    return (
      <div style={{ padding: "20px", color: "red", background: "#fee2e2" }}>
        <h3>Živý náhled: Data nebyla nalezena</h3>
        <p>Zkontrolujte strukturu v souboru home.mdx</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#000000" }}>
      {data.page.blocks?.map((block: any, i: number) => {
        // Vyčistíme název bloku od případných tina přípon (např. PageBlocksNavbar -> navbar)
        const blockType = block.__typename?.replace("PageBlocks", "").toLowerCase();

        switch (blockType) {
          
          case "navbar":
            return (
              <nav key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  <RenderMarkdown text={block.logoText} label="Logo" />
                </div>
                <div style={{ display: "flex", gap: "25px" }}>
                  {block.links?.map((link: any, idx: number) => (
                    <a key={idx} href={link.url || "#"} style={{ textDecoration: "none", color: "#0066cc", fontWeight: 500 }}>
                      <RenderMarkdown text={link.label} label={`Odkaz ${idx + 1}`} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          case "content":
            return (
              <div key={i} style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", fontSize: "18px" }}>
                <RenderMarkdown text={block.body} label="Obsah těla" />
              </div>
            );

          default:
            // Pokud Tina vygeneruje blok, který nemáme v switchi, nevykreslíme prázdno,
            // ale ukážeme debug krabičku, abychom hned věděli, co opravit!
            return (
              <div key={i} style={{ margin: "20px", padding: "15px", border: "1px dashed #ccc", background: "#fffbeb" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "#b45309" }}>
                  <strong>Neznámý blok:</strong> {block.__typename}
                </p>
                <pre style={{ fontSize: "11px", overflowX: "auto" }}>{JSON.stringify(block, null, 2)}</pre>
              </div>
            );
        }
      })}
    </div>
  );
}