import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Stránky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => (document._sys.filename === "home" ? "/" : `/${document._sys.filename}`),
        },
        fields: [
          { type: "string", name: "adminLabel", label: "Interní název", isTitle: true, required: true },
          { type: "string", name: "outerBgColor", label: "Barva pozadí stránky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohyblivé bloky stránky",
            ui: { visualSelector: true },
            templates: [
              // NAVBAR BLOCK
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  {
                    type: "rich-text",
                    name: "logoText",
                    label: "Text loga",
                    parser: { type: "mdx" },
                    // 🎛️ Omezení pouze na základní text bez nadpisů a obrázků
                    ui: {
                      heading: false,
                      image: false,
                      quote: false,
                      ul: false,
                      ol: false,
                      code_block: false,
                    } as any
                  },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { 
                        type: "rich-text", 
                        name: "label", 
                        label: "Název odkazu", 
                        parser: { type: "mdx" },
                        ui: {
                          heading: false,
                          image: false,
                          quote: false,
                          ul: false,
                          ol: false,
                          code_block: false,
                        } as any
                      },
                      { type: "string", name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // HERO BLOCK
              {
                name: "hero",
                label: "VELKÝ HERO",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "heading", label: "Hlavní nadpis (H1)", parser: { type: "mdx" }, ui: { image: false, quote: false, ul: false, ol: false, code_block: false } as any },
                  { type: "rich-text", name: "subheading", label: "Podnadpis", parser: { type: "mdx" }, ui: { image: false, quote: false, ul: false, ol: false, code_block: false } as any },
                  { type: "rich-text", name: "body", label: "Obsah sekce", parser: { type: "mdx" }, ui: { quote: false, ul: false, ol: false } as any },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string", name: "fontWeight", label: "Tloušťka", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"}] },
                  { type: "number", name: "pt", label: "Padding Top" },
                  { type: "number", name: "pb", label: "Padding Bottom" }
                ]
              },
              // HEADING BLOCK
              {
                name: "heading",
                label: "NADPIS (H2)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "text", label: "Text nadpisu", parser: { type: "mdx" }, ui: { image: false, quote: false, ul: false, ol: false, code_block: false } as any },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string", name: "fontWeight", label: "Tloušťka", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"}] },
                  { type: "number", name: "mt", label: "Margin Top" },
                  { type: "number", name: "mb", label: "Margin Bottom" }
                ]
              },
              // CONTENT BLOCK
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "body", label: "Obsah", parser: { type: "mdx" }, ui: { code_block: false } as any },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" }
                ]
              },
              // CTA BLOCK
              {
                name: "cta",
                label: "TLAČÍTKO (CTA)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "title", label: "Text tlačítka", parser: { type: "mdx" }, ui: { heading: false, image: false, quote: false, ul: false, ol: false, code_block: false } as any },
                  { type: "string", name: "link", label: "Odkaz" },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "btnBgColor", label: "Barva pozadí", ui: { component: "color" } },
                  { type: "string", name: "btnTextColor", label: "Barva textu", ui: { component: "color" } }
                ]
              },
              // IMAGE BLOCK
              {
                name: "image",
                label: "IMAGE (Obrázek)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "image", name: "url", label: "Soubor obrázku" },
                  { type: "string", name: "caption", label: "Popisek obrázku" },
                  { type: "rich-text", name: "body", label: "Text pod obrázkem", parser: { type: "mdx" }, ui: { heading: false, image: false, quote: false, code_block: false } as any },
                  { type: "string", name: "align", label: "Zarovnání", options: [{value:"left",label:"Vlevo"},{value:"center",label:"Střed"},{value:"right",label:"Vpravo"}] }
                ]
              }
            ],
          },
        ],
      },
    ],
  },
});