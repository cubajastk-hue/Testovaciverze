// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Str\xE1nky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => document._sys.filename === "home" ? "/" : `/${document._sys.filename}`
        },
        fields: [
          { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev", isTitle: true, required: true },
          { type: "string", name: "outerBgColor", label: "Barva pozad\xED str\xE1nky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: { visualSelector: true },
            templates: [
              // NAVBAR
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  {
                    type: "string",
                    name: "logoText",
                    label: "Text loga",
                    ui: { component: "markdown" }
                  },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "N\xE1zev odkazu",
                        ui: { component: "markdown" }
                      },
                      { type: "string", name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // HERO
              {
                name: "hero",
                label: "VELK\xDD HERO",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  { type: "string", name: "heading", label: "Hlavn\xED nadpis (H1)", ui: { component: "markdown" } },
                  { type: "string", name: "subheading", label: "Podnadpis", ui: { component: "markdown" } },
                  { type: "string", name: "body", label: "Obsah sekce", ui: { component: "markdown" } },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }] },
                  { type: "number", name: "pt", label: "Padding Top" },
                  { type: "number", name: "pb", label: "Padding Bottom" }
                ]
              },
              // HEADING
              {
                name: "heading",
                label: "NADPIS (H2)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  { type: "string", name: "text", label: "Text nadpisu", ui: { component: "markdown" } },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
                  { type: "number", name: "mt", label: "Margin Top" },
                  { type: "number", name: "mb", label: "Margin Bottom" }
                ]
              },
              // CONTENT
              {
                name: "content",
                label: "TEXTOV\xDD OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  { type: "string", name: "body", label: "Obsah", ui: { component: "markdown" } },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
