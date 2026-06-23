import { defineConfig } from "tinacms";
import { TipTapEditor } from "./TipTapEditor"; // 🚀 Tímto naimportujeme čistý stažený editor

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
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
          router: ({ document }) => (document._sys.filename === "home" ? "/" : `/${document._sys.filename}`),
        },
        fields: [
          { type: "string", name: "adminLabel", label: "Interní název", isTitle: true, required: true },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Bloky stránky",
            templates: [
              // HLAVIČKA (NAVBAR)
              {
                name: "navbar",
                label: "HLAVIČKA (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  ({
                    type: "string",
                    name: "logoText",
                    label: "Text loga",
                    ui: { 
                      component: TipTapEditor,
                      toolbar: ["bold", "italic"] 
                    }
                  } as any),
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      ({ 
                        type: "string", 
                        name: "label", 
                        label: "Název odkazu", 
                        ui: { 
                          component: TipTapEditor,
                          toolbar: ["bold", "italic"]
                        } 
                      } as any),
                      { type: "string", name: "url", label: "URL" }
                    ]
                  }
                ]
              },
              // TEXTOVÝ OBSAH
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  ({ 
                    type: "string", 
                    name: "body", 
                    label: "Obsah", 
                    ui: { 
                      component: TipTapEditor,
                      toolbar: ["heading", "bold", "italic", "quote", "bulletList"]
                    } 
                  } as any)
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});