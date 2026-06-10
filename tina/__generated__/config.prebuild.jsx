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
            name: "outerBgColor",
            label: "Barva pozad\xED str\xE1nky (Vyber si jakoukoli)",
            ui: {
              // Tohle políčko aktivuje kompletní RGB / Hex kapátko v administraci
              component: "color"
            }
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: {
              // Tohle aktivuje drag-and-drop (přesouvání) v levém panelu Tiny
              visualSelector: true
            },
            templates: [
              {
                name: "navbar",
                label: "Naviga\u010Dn\xED li\u0161ta (Navbar)",
                fields: [
                  {
                    type: "string",
                    name: "logoText",
                    label: "Text loga"
                  },
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
              {
                name: "hero",
                label: "Hlavn\xED velk\xFD blok (Hero)",
                fields: [
                  { type: "string", name: "heading", label: "Hlavn\xED nadpis" },
                  { type: "string", name: "subheading", label: "Podnadpis" }
                ]
              }
              // Sem budeme moct v budoucnu přidávat další bloky (galerie, kontakty atd.)
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
