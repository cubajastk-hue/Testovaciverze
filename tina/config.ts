// @ts-nocheck
import { defineConfig } from "tinacms";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: {
    tina: { mediaRoot: "uploads", publicFolder: "public" },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Stránky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => (document._sys.filename === "home" ? `/` : undefined),
        },
        fields: [
          { type: "string", name: "title", label: "Nadpis", isTitle: true, required: true },
          { type: "image", name: "heroImage", label: "Hlavní obrázek" },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Bloky stránky",
            ui: {
              // Opraveno: label pro přehlednost v sidebaru
              itemProps: (item) => ({ label: item?.text || item?.caption || item?.name || "Blok" }),
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
                    // Použity zkratky 'ul' a 'ol', které Tina neodmítne
                    toolbarOverride: ["bold", "italic", "link", "quote", "ul", "ol"],
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
                    label: "Velikost",
                    options: [
                      { label: "Malý", value: "small" },
                      { label: "Střední", value: "medium" },
                      { label: "Velký", value: "large" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});