"use client";
import React from "react";
import { useTina } from "tinacms/dist/react";

// Jednoduchý renderer čistého HTML z TipTapu
const RenderHTML = ({ html }: { html: string }) => {
  if (!html) return null;
  return (
    <span className="prose-html">
      <style>{`
        .prose-html h2 { font-size: 1.75rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; color: inherit; }
        .prose-html p { margin-bottom: 1rem; line-height: 1.7; }
        .prose-html strong { font-weight: 700; }
        .prose-html em { font-style: italic; }
        .prose-html ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-html blockquote { border-left: 4px solid #ccc; padding-left: 1rem; color: #555; font-style: italic; }
        /* Skrytí okrajů u loga a odkazů */
        .prose-html p:last-child { margin-bottom: 0; }
      `}</style>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
};

export function PageComponents(props: { data: any; query: string; variables: any }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (!data || !data.page || !data.page.blocks) {
    return <div style={{ padding: "20px", color: "red" }}>Data nebyla nalezena.</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#000000", fontFamily: "sans-serif" }}>
      {data.page.blocks?.map((block: any, i: number) => {
        const blockType = block.__typename?.replace("PageBlocks", "").toLowerCase();

        switch (blockType) {
          case "navbar":
            return (
              <nav key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  <RenderHTML html={block.logoText} />
                </div>
                <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
                  {block.links?.map((link: any, idx: number) => (
                    <a key={idx} href={link.url || "#"} style={{ textDecoration: "none", color: "#0066cc", fontWeight: 500 }}>
                      <RenderHTML html={link.label} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          case "content":
            return (
              <div key={i} style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}>
                <RenderHTML html={block.body} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}