import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Pomocná funkce, abychom nemuseli psát stejná designová políčka pro každý blok dokola
const designFields = [
  {
    type: "string",
    name: "align",
    label: "Zarovnání textu",
    options: [
      { value: "left", label: "Vlevo" },
      { value: "center", label: "Na střed" },
      { value: "right", label: "Vpravo" },
    ],
  },
  { type: "string", name: "textColor", label: "Barva textu (Hex např. #ff0000 nebo název red)" },
  { type: "number", name: "fontSize", label: "Velikost písma v px (např. 16, 24, 48)" },
  {
    type: "string",
    name: "fontWeight",
    label: "Tloušťka písma",
    options: [
      { value: "normal", label: "Normální" },
      { value: "bold", label: "Tučné" },
      { value: "900", label: "Extrémně tlusté" },
    ],
  },
  { type: "boolean", name: "italic", label: "Kurzíva" },
  { type: "number", name: "marginTop", label: "Odsazení shora v pixelech (Margin Top)" },
  { type: "number", name: "marginBottom", label: "Odsazení zespoda v pixelech (Margin Bottom)" },
  { type: "number", name: "paddingLeft", label: "Odsazení zleva v pixelech (Padding Left)" },
  { type: "number", name: "paddingRight", label: "Odsazení zprava v pixelech (Padding Right)" },
];

export default defineConfig({
  branch,
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
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            return undefined;
          },
        },
        fields: [
          { type: "string", name: "title", label: "Název stránky", isTitle: true, required: true },
          { type: "string", name: "description", label: "Popisek pod nadpisem" },
          {
            type: "string",
            name: "titleAlignment",
            label: "Zarovnání hlavního nadpisu",
            options: [
              { value: "center", label: "Na střed" },
              { value: "left", label: "Vlevo" },
              { value: "right", label: "Vpravo" },
            ],
          },
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
                  ...designFields,
                ],
              },
              // 3. HEADING
              {
                name: "heading",
                label: "Nadpis (Heading)",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" },
                  ...designFields,
                ],
              },
              // 4. CONTENT
              {
                name: "content",
                label: "Textový obsah (Content)",
                fields: [
                  { type: "rich-text", name: "body", label: "Obsah" },
                  ...designFields,
                ],
              },
              // 5. IMAGE
              {
                name: "image",
                label: "Obrázek (Image)",
                fields: [
                  { type: "image", name: "url", label: "Obrázek" },
                  { type: "string", name: "caption", label: "Popisek obrázku" },
                  { type: "number", name: "borderRadius", label: "Zaoblení rohů obrázku v px" },
                  { type: "number", name: "marginTop", label: "Odsazení shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazení zespoda v px" },
                ],
              },
              // 6. CTA (Tlačítko)
              {
                name: "cta",
                label: "Tlačítko (Cta)",
                fields: [
                  { type: "string", name: "title", label: "Text tlačítka" },
                  { type: "string", name: "link", label: "Odkaz (URL)" },
                  { type: "string", name: "btnBgColor", label: "Barva tlačítka (Hex)", ui: { component: "color" } },
                  { type: "string", name: "btnTextColor", label: "Barva textu tlačítka (Hex)" },
                  { type: "number", name: "borderRadius", label: "Zaoblení rohů tlačítka v px" },
                  ...designFields,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});