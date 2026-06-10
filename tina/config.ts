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
    name: "outerBgColor",
    label: "Barva pozadí stránky (Vyber si jakoukoli)",
    ui: {
      // Tohle políčko aktivuje kompletní RGB / Hex kapátko v administraci
      component: "color",
    },
  },
  {
    type: "object",
    list: true,
    name: "blocks",
    label: "Pohyblivé bloky stránky",
    ui: {
      // Tohle aktivuje drag-and-drop (přesouvání) v levém panelu Tiny
      visualSelector: true,
    },
    templates: [
      {
        name: "navbar",
        label: "Navigační lišta (Navbar)",
        fields: [
          {
            type: "string",
            name: "logoText",
            label: "Text loga",
          },
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
      {
        name: "hero",
        label: "Hlavní velký blok (Hero)",
        fields: [
          { type: "string", name: "heading", label: "Hlavní nadpis" },
          { type: "string", name: "subheading", label: "Podnadpis" },
        ],
      },
      // Sem budeme moct v budoucnu přidávat další bloky (galerie, kontakty atd.)
    ],
  },
],
      },
    ],
  },
});