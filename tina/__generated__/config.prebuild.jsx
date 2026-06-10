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
            label: "N\xE1zev str\xE1nky",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Popisek pod nadpisem"
          },
          {
            type: "string",
            name: "titleAlignment",
            label: "Zarovn\xE1n\xED hlavn\xEDho nadpisu a popisku",
            options: [
              { value: "items-center text-center", label: "Na st\u0159ed" },
              { value: "items-start text-left", label: "Vlevo" },
              { value: "items-end text-right", label: "Vpravo" }
            ]
          },
          {
            type: "string",
            name: "outerBgColor",
            label: "Barva pozad\xED str\xE1nky",
            ui: {
              component: "color"
            }
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: {
              // Aktivuje vizuální drag-and-drop řazení položek v levém panelu
              visualSelector: true
            },
            templates: [
              // 1. NAVBAR (Ten zarovnání nepotřebuje, natahuje se sám)
              {
                name: "navbar",
                label: "Naviga\u010Dn\xED li\u0161ta (Navbar)",
                fields: [
                  { type: "string", name: "logoText", label: "Text loga" },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { type: "string", name: "label", label: "N\xE1zev odkazu" },
                      { type: "string", name: "url", label: "Kam vede (URL)" }
                    ]
                  }
                ]
              },
              // 2. HERO
              {
                name: "hero",
                label: "Hlavn\xED velk\xFD blok (Hero)",
                fields: [
                  { type: "string", name: "heading", label: "Hlavn\xED nadpis" },
                  { type: "string", name: "subheading", label: "Podnadpis" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovn\xE1n\xED bloku",
                    options: [
                      { value: "items-center text-center", label: "Na st\u0159ed" },
                      { value: "items-start text-left", label: "Vlevo" },
                      { value: "items-end text-right", label: "Vpravo" }
                    ]
                  }
                ]
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
                    label: "Zarovn\xE1n\xED nadpisu",
                    options: [
                      { value: "text-center", label: "Na st\u0159ed" },
                      { value: "text-left", label: "Vlevo" },
                      { value: "text-right", label: "Vpravo" }
                    ]
                  }
                ]
              },
              // 4. CONTENT
              {
                name: "content",
                label: "Textov\xFD obsah (Content)",
                fields: [
                  { type: "rich-text", name: "body", label: "Obsah" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovn\xE1n\xED textu",
                    options: [
                      { value: "text-center", label: "Na st\u0159ed" },
                      { value: "text-left", label: "Vlevo" },
                      { value: "text-justify", label: "Do bloku" }
                    ]
                  }
                ]
              },
              // 5. IMAGE
              {
                name: "image",
                label: "Obr\xE1zek (Image)",
                fields: [
                  { type: "image", name: "url", label: "Obr\xE1zek" },
                  { type: "string", name: "caption", label: "Popisek obr\xE1zku" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovn\xE1n\xED obr\xE1zku",
                    options: [
                      { value: "justify-center text-center", label: "Na st\u0159ed" },
                      { value: "justify-start text-left", label: "Vlevo" },
                      { value: "justify-end text-right", label: "Vpravo" }
                    ]
                  }
                ]
              },
              // 6. CTA (Tlačítko)
              {
                name: "cta",
                label: "Tla\u010D\xEDtko (Cta)",
                fields: [
                  { type: "string", name: "title", label: "Text tla\u010D\xEDtka" },
                  { type: "string", name: "link", label: "Odkaz (URL)" },
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovn\xE1n\xED tla\u010D\xEDtka",
                    options: [
                      { value: "justify-center", label: "Na st\u0159ed" },
                      { value: "justify-start", label: "Vlevo" },
                      { value: "justify-end", label: "Vpravo" }
                    ]
                  }
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
