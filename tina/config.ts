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
            label: "Název stránky",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Popisek pod nadpisem",
          },
          {
            type: "string",
            name: "outerBgColor",
            label: "Barva pozadí stránky",
            ui: {
              component: "color",
            },
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohyblivé bloky stránky",
            ui: {
              // Aktivuje vizuální drag-and-drop řazení položek
              visualSelector: true,
            },
            templates: [
              // 1. NAVBAR
              {
                name: "navbar",
                label: "Navigační lišta (Navbar)",
                fields: [
                  { type: "string", name: "logoText", label: "Text loga" },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { type: "string", name: "label", label: "Název odkazu" },
                      { type: "string", name: "url", label: "Kam vede (URL)" },
                    ],
                  },
                ],
              },
              // 2. HERO
              {
                name: "hero",
                label: "Hlavní velký blok (Hero)",
                fields: [
                  { type: "string", name: "heading", label: "Hlavní nadpis" },
                  { type: "string", name: "subheading", label: "Podnadpis" },
                ],
              },
              // 3. HEADING (Tvá stará šablona)
              {
                name: "heading",
                label: "Nadpis (Heading)",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" },
                ],
              },
              // 4. CONTENT (Tvá stará šablona)
              {
                name: "content",
                label: "Textový obsah (Content)",
                fields: [
                  { type: "rich-text", name: "body", label: "Obsah" },
                ],
              },
              // 5. IMAGE (Tvá stará šablona)
              {
                name: "image",
                label: "Obrázek (Image)",
                fields: [
                  { type: "image", name: "url", label: "Obrázek" },
                  { type: "string", name: "caption", label: "Popisek obrázku" },
                ],
              },
              // 6. CTA (Tvá stará šablona)
              {
                name: "cta",
                label: "Tlačítko (Cta)",
                fields: [
                  { type: "string", name: "title", label: "Text tlačítka" },
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