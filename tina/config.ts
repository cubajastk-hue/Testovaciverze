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
          // Nastavení cesty pro Live Editing (home.mdx bude na "/")
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis stránky (SEO)",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Obsah stránky (Bloky)",
            templates: [
              // 1. BLOK: NADPIS
              {
                name: "heading",
                label: "Nadpis",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" },
                ],
              },
              // 2. BLOK: TEXTOVÝ OBSAH
              {
                name: "content",
                label: "Textový obsah",
                fields: [
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Text",
                    toolbarOverride: ["bold", "italic", "link", "quote", "ul", "ol"],
                  },
                ],
              },
              // 3. BLOK: OBRÁZEK
              {
                name: "image",
                label: "Obrázek",
                fields: [
                  { type: "image", name: "url", label: "Vybrat obrázek" },
                  { type: "string", name: "caption", label: "Popisek pod obrázkem" },
                ],
              },
              // 4. BLOK: TLAČÍTKO
              {
                name: "cta",
                label: "Tlačítko",
                fields: [
                  { type: "string", name: "title", label: "Text na tlačítku" },
                  { type: "string", name: "link", label: "Odkaz (URL)" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});