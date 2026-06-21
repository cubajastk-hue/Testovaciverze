"use client";

import React from "react";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface PageCompProps {
  data: any;
  query: string;
  variables: any;
}

const getBlockStyles = (block: any) => {
  return {
    textAlign: block.align && block.align !== "custom" ? (block.align as any) : undefined,
    color: block.textColor || undefined,
    fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
    fontWeight: block.fontWeight || undefined,
    paddingTop: block.pt ? `${block.pt}px` : undefined,
    paddingBottom: block.pb ? `${block.pb}px` : undefined,
    marginTop: block.mt ? `${block.mt}px` : undefined,
    marginBottom: block.mb ? `${block.mb}px` : undefined,
  };
};

export function PageComp(props: PageCompProps) {
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
        const typeName = block.__typename?.replace("PageBlocks", "")?.toLowerCase();

        switch (typeName) {
          case "navbar":
            return (
              <nav key={index} data-tina-field={block} style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="logo">
                  <TinaMarkdown content={block.logoText} />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {block.links?.map((link: any, i: number) => (
                    <a key={i} href={link.url} style={{ textDecoration: "none" }}>
                      <TinaMarkdown content={link.label} />
                    </a>
                  ))}
                </div>
              </nav>
            );

          case "hero":
            return (
              <section key={index} data-tina-field={block} style={{ ...styles, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {block.heading && (
                  <h1 style={{ fontSize: "2.5em", margin: 0 }}>
                    <TinaMarkdown content={block.heading} />
                  </h1>
                )}
                {block.subheading && (
                  <div style={{ fontSize: "1.5em", opacity: 0.8 }}>
                    <TinaMarkdown content={block.subheading} />
                  </div>
                )}
                {block.body && <TinaMarkdown content={block.body} />}
              </section>
            );

          case "heading":
            return (
              <h2 key={index} data-tina-field={block} style={{ ...styles, margin: 0 }}>
                <TinaMarkdown content={block.text} />
              </h2>
            );

          case "content":
            return (
              <div key={index} data-tina-field={block} style={styles}>
                <TinaMarkdown content={block.body} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}