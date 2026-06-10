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
            name: "titleAlignment",
            label: "Zarovnání hlavního nadpisu a popisku",
            options: [
              { value: "items-center text-center", label: "Na střed" },
              { value: "items-start text-left", label: "Vlevo" },
              { value: "items-end text-right", label: "Vpravo" },
            ],
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
              // Aktivuje vizuální drag-and-drop řazení položek v levém panelu
              visualSelector: true,
            },
            templates: [
              // 1. NAVBAR (Ten zarovnání nepotřebuje, natahuje se sám)
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
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovnání bloku",
                    options: [
                      { value: "items-center text-center", label: "Na střed" },
                      { value: "items-start text-left", label: "Vlevo" },
                      { value: "items-end text-right", label: "Vpravo" },
                    ],
                  },
                ],
              },
              // 3. HEADING
              {
                name: "heading",
                label: "Nadpis (Heading)",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovnání nadpisu",
                    options: [
                      { value: "text-center", label: "Na střed" },
                      { value: "text-left", label: "Vlevo" },
                      { value: "text-right", label: "Vpravo" },
                    ],
                  },
                ],
              },
              // 4. CONTENT
              {
                name: "content",
                label: "Textový obsah (Content)",
                fields: [
                  { type: "rich-text", name: "body", label: "Obsah" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovnání textu",
                    options: [
                      { value: "text-center", label: "Na střed" },
                      { value: "text-left", label: "Vlevo" },
                      { value: "text-justify", label: "Do bloku" },
                    ],
                  },
                ],
              },
              // 5. IMAGE
              {
                name: "image",
                label: "Obrázek (Image)",
                fields: [
                  { type: "image", name: "url", label: "Obrázek" },
                  { type: "string", name: "caption", label: "Popisek obrázku" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovnání obrázku",
                    options: [
                      { value: "justify-center text-center", label: "Na střed" },
                      { value: "justify-start text-left", label: "Vlevo" },
                      { value: "justify-end text-right", label: "Vpravo" },
                    ],
                  },
                ],
              },
              // 6. CTA (Tlačítko)
              {
                name: "cta",
                label: "Tlačítko (Cta)",
                fields: [
                  { type: "string", name: "title", label: "Text tlačítka" },
                  { type: "string", name: "link", label: "Odkaz (URL)" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovnání tlačítka",
                    options: [
                      { value: "justify-center", label: "Na střed" },
                      { value: "justify-start", label: "Vlevo" },
                      { value: "justify-end", label: "Vpravo" },
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