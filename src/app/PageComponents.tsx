"use client";

import React from "react";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";

export const TextContentBlock = ({ data }: any) => {
  if (!data) return null;

  const blockStyle = {
    paddingTop: `${data.padding?.top || 0}px`,
    paddingRight: `${data.padding?.right || 0}px`,
    paddingBottom: `${data.padding?.bottom || 0}px`,
    paddingLeft: `${data.padding?.left || 0}px`,
    
    marginTop: `${data.margin?.top || 0}px`,
    marginRight: `${data.margin?.right || 0}px`,
    marginBottom: `${data.margin?.bottom || 0}px`,
    marginLeft: `${data.margin?.left || 0}px`,
  };

  return (
    <div style={blockStyle} className="w-full mx-auto max-w-4xl px-4" data-tina-field={tinaField(data, "body")}>
      <div 
        className="rich-text-output"
        dangerouslySetInnerHTML={{ __html: data.body || "" }} 
      />
      
      <style jsx global>{`
        .rich-text-output { word-break: break-word; overflow-wrap: break-word; }
        
        .rich-text-output h1 { font-size: 2.5rem; font-weight: 800; margin-top: 0; margin-bottom: 1rem; line-height: 1.2; }
        .rich-text-output h2 { font-size: 2rem; font-weight: 700; margin-top: 0; margin-bottom: 0.875rem; line-height: 1.3; }
        .rich-text-output h3 { font-size: 1.5rem; font-weight: 600; margin-top: 0; margin-bottom: 0.75rem; }
        .rich-text-output h4 { font-size: 1.25rem; font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; }
        .rich-text-output h5 { font-size: 1.1rem; font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; }
        .rich-text-output h6 { font-size: 1rem; font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; }
        
        .rich-text-output p { margin-top: 0; margin-bottom: 1rem; line-height: 1.6; color: #334155; }
        .rich-text-output mark { padding: 2px 4px; border-radius: 4px; }
        .rich-text-output ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-text-output ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-text-output blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; font-style: italic; margin: 1rem 0; color: #475569; }
        .rich-text-output span[style*="font-size"] { display: inline-block; }

        /* 🚀 FIX: Totální zrušení mezery pod posledním prvkem (odpovídá editoru) */
        .rich-text-output > *:last-child { margin-bottom: 0 !important; }
      `}</style>
    </div>
  );
};

export function PageComponents(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const blocks = data?.page?.blocks || [];

  return (
    <main className="w-full min-h-screen bg-white py-4">
      {blocks.map((block: any, index: number) => {
        switch (block.__typename) {
          case "PageBlocksTextContent":
            return <TextContentBlock key={index} data={block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}