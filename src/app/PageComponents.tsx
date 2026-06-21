"use client";
import React from "react";
import { marked } from "marked";

const RenderMarkdown = ({ text }: { text: string }) => {
  if (!text) return null;
  const rawHtml = marked(text) as string;
  return <span dangerouslySetInnerHTML={{ __html: rawHtml }} />;
};

export function PageComponents({ data }: { data: any }) {
  return (
    <div>
      {data.blocks?.map((block: any, i: number) => {
        switch (block.__typename) {
          
          // Vykreslení hlavičky (Navbaru)
          case "PageBlocksNavbar":
            return (
              <nav key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
                {/* Logo, které teď může mít klidně část textu tučně */}
                <div className="logo" style={{ fontSize: "20px" }}>
                  <RenderMarkdown text={block.logoText} />
                </div>
                
                {/* Odkazy v menu, které mohou mít také formátovaný text */}
                <div style={{ display: "flex", gap: "20px" }}>
                  {block.links?.map((link: any, idx: number) => (
                    <a key={idx} href={link.url} style={{ textDecoration: "none", color: "#333" }}>
                      <RenderMarkdown text={link.label} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          // Vykreslení klasického textového bloku
          case "PageBlocksContent":
            return (
              <div key={i} style={{ padding: "40px 30px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
                <RenderMarkdown text={block.body} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}