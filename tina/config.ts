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
              // 1. NAVBAR
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  {
                    type: "rich-text",
                    name: "logoText",
                    label: "Text loga",
                    // Takhle Tinu donutíme ukázat jen Bold, Italic a Link:
                    toolbarOverride: ["bold", "italic", "link"],
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
                        toolbarOverride: ["bold", "italic"] 
                      },
                      { type: "string", name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // 2. HERO
              {
                name: "hero",
                label: "VELKÝ HERO",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "heading", label: "Hlavní nadpis (H1)", toolbarOverride: ["bold", "italic"] },
                  { type: "rich-text", name: "subheading", label: "Podnadpis", toolbarOverride: ["bold", "italic"] },
                  { type: "rich-text", name: "body", label: "Obsah sekce" }, // Tady necháme plný editor
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string", name: "fontWeight", label: "Tloušťka", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"}] },
                  { type: "number", name: "pt", label: "Padding Top" },
                  { type: "number", name: "pb", label: "Padding Bottom" }
                ]
              },
              // 3. HEADING
              {
                name: "heading",
                label: "NADPIS (H2)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "text", label: "Text nadpisu", toolbarOverride: ["bold", "italic"] },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "number", name: "mt", label: "Margin Top" },
                  { type: "number", name: "mb", label: "Margin Bottom" }
                ]
              },
              // 4. CONTENT
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "rich-text", name: "body", label: "Obsah" },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});