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
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return void 0;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hlavn\xED obr\xE1zek"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Obsah"
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Bloky str\xE1nky",
            ui: {
              // Umožňuje vidět názvy bloků a přesouvat je v seznamu
              itemProps: (item) => {
                return { label: item?.label || item?.name };
              }
            },
            templates: [
              {
                name: "heading",
                label: "Velk\xFD Nadpis",
                fields: [{ type: "string", name: "text", label: "Text nadpisu" }]
              },
              {
                name: "content",
                label: "Textov\xFD obsah",
                fields: [
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Text",
                    // Aktivuje lištu pro tučné písmo, kurzívu, seznamy atd.
                    toolbarOverride: ["bold", "italic", "link", "quote", "ul", "ol"]
                  }
                ]
              },
              {
                name: "image",
                label: "Obr\xE1zek",
                fields: [
                  { type: "image", name: "url", label: "Obr\xE1zek" },
                  { type: "string", name: "caption", label: "Popisek" },
                  {
                    type: "string",
                    name: "size",
                    label: "Velikost obr\xE1zku",
                    options: [
                      { label: "Mal\xFD", value: "small" },
                      { label: "St\u0159edn\xED", value: "medium" },
                      { label: "Velk\xFD (p\u0159es celou \u0161\xED\u0159ku)", value: "large" }
                    ]
                  }
                ]
              },
              {
                name: "cta",
                label: "V\xFDzva k akci",
                fields: [
                  { type: "string", name: "text", label: "Text tla\u010D\xEDtka" },
                  { type: "string", name: "link", label: "Odkaz" }
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
