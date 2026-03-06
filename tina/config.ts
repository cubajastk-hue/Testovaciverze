import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Stránky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hlavní obrázek",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Obsah",
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Bloky stránky",
            ui: {
              // Umožňuje vidět názvy bloků a přesouvat je v seznamu
              itemProps: (item) => {
                return { label: item?.label || item?.name };
              },
            },
            templates: [
              {
                name: "heading",
                label: "Velký Nadpis",
                fields: [{ type: "string", name: "text", label: "Text nadpisu" }],
              },
              {
                name: "content",
                label: "Textový obsah",
                fields: [
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Text",
                    // Aktivuje lištu pro tučné písmo, kurzívu, seznamy atd.
                    toolbarOverride: ["bold", "italic", "link", "quote", "list"],
                  },
                ],
              },
              {
                name: "image",
                label: "Obrázek",
                fields: [
                  { type: "image", name: "url", label: "Obrázek" },
                  { type: "string", name: "caption", label: "Popisek" },
                  {
                    type: "string",
                    name: "size",
                    label: "Velikost obrázku",
                    options: [
                      { label: "Malý", value: "small" },
                      { label: "Střední", value: "medium" },
                      { label: "Velký (přes celou šířku)", value: "large" },
                    ],
                  },
                ],
              },
              {
                name: "cta",
                label: "Výzva k akci",
                fields: [
                  { type: "string", name: "text", label: "Text tlačítka" },
                  { type: "string", name: "link", label: "Odkaz" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});