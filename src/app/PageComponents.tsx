"use client";
import React from "react";
import { marked } from "marked";
import { useTina } from "tinacms/dist/react";

// Komponenta pro vykreslení Markdownu se správnými velikostmi nadpisů
const RenderMarkdown = ({ text }: { text: string }) => {
  if (!text) return null;
  const rawHtml = marked(text) as string;
  
  return (
    <span className="prose-markdown">
      {/* 🚀 TENTO BLOK STYLŮ ZAJISTÍ, ŽE NADPISY BUDOU KONEČNĚ VELKÉ A HEZKÉ */}
      <style>{`
        .prose-markdown h1 { font-size: 2.25rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 1rem; line-height: 1.2; color: inherit; }
        .prose-markdown h2 { font-size: 1.75rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; color: inherit; }
        .prose-markdown h3 { font-size: 1.35rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4; color: inherit; }
        .prose-markdown p { margin-bottom: 1rem; line-height: 1.7; }
        .prose-markdown strong { font-weight: 700; }
        .prose-markdown ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-markdown ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
      `}</style>
      <span dangerouslySetInnerHTML={{ __html: rawHtml }} />
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
                  <RenderMarkdown text={block.logoText} />
                </div>
                <div style={{ display: "flex", gap: "25px" }}>
                  {block.links?.map((link: any, idx: number) => (
                    <a key={idx} href={link.url || "#"} style={{ textDecoration: "none", color: "#0066cc", fontWeight: 500 }}>
                      <RenderMarkdown text={link.label} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          case "content":
            return (
              <div key={i} style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto" }}>
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