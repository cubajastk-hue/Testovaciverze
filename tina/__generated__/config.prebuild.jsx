// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Získáš na app.tina.io (pro lokální vývoj může zůstat prázdné)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      // Doporučuji složku pro obrázky
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
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Obsah"
          }
        ]
      }
    ]
  },
  // UI musí být TADY, mimo schema
  ui: {
    router: ({ document }) => {
      if (document._sys.collection === "page") {
        return "/";
      }
      return void 0;
    }
  }
});
export {
  config_default as default
};
