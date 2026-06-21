"use client";
import React from "react";
import { marked } from "marked";
import { useTina } from "tinacms/dist/react"; // 🚀 Importujeme live preview hák

const RenderMarkdown = ({ text }: { text: string }) => {
  if (!text) return null;
  const rawHtml = marked(text) as string;
  return <span dangerouslySetInnerHTML={{ __html: rawHtml }} />;
};

// 🚀 Tady jsme přidali query a variables do typů (props)
export function PageComponents(props: { data: any; query: string; variables: any }) {
  // 🔄 useTina zajistí, že když v adminu napíšeš písmenko, web se hned překreslí
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div>
      {data.blocks?.map((block: any, i: number) => {
        switch (block.__typename) {
          
          case "PageBlocksNavbar":
            return (
              <nav key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#f8f9fa", borderBottom: "1px solid #e9ecef" }}>
                <div className="logo" style={{ fontSize: "20px" }} data-tina-field={block.logoText}>
                  <RenderMarkdown text={block.logoText} />
                </div>
                
                <div style={{ display: "flex", gap: "20px" }}>
                  {block.links?.map((link: any, idx: number) => (
                    <a key={idx} href={link.url}>
                      <RenderMarkdown text={link.label} />
                    </a>
                  ))}
                </div>
              </nav>
            );

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