// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Str\xE1nky",
        path: "content/pages",
        format: "mdx",
        ui: {
          // Nastavení cesty pro Live Editing (home.mdx bude na "/")
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return void 0;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis str\xE1nky (SEO)",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Obsah str\xE1nky (Bloky)",
            templates: [
              // 1. BLOK: NADPIS
              {
                name: "heading",
                label: "Nadpis",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" }
                ]
              },
              // 2. BLOK: TEXTOVÝ OBSAH
              {
                name: "content",
                label: "Textov\xFD obsah",
                fields: [
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Text",
                    toolbarOverride: ["bold", "italic", "link", "quote", "ul", "ol"]
                  }
                ]
              },
              // 3. BLOK: OBRÁZEK
              {
                name: "image",
                label: "Obr\xE1zek",
                fields: [
                  { type: "image", name: "url", label: "Vybrat obr\xE1zek" },
                  { type: "string", name: "caption", label: "Popisek pod obr\xE1zkem" }
                ]
              },
              // 4. BLOK: TLAČÍTKO
              {
                name: "cta",
                label: "Tla\u010D\xEDtko",
                fields: [
                  { type: "string", name: "title", label: "Text na tla\u010D\xEDtku" },
                  { type: "string", name: "link", label: "Odkaz (URL)" }
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
