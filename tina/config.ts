import React from "react";
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  
  // 💡 Tady zaregistrujeme komponentu do administračního rozhraní Tiny
  cmsCallback: (cms) => {
    import("react-simplemde-editor").then((SimpleMDEModule) => {
      import("easymde/dist/easymde.min.css" as any);
      const SimpleMDE = SimpleMDEModule.default;

      cms.plugins.add({
        __typename: "FieldPlugin",
        name: "simplemde",
        Component: ({ field, input, meta }: any) => {
          return React.createElement(SimpleMDE, {
            value: input.value || "",
            onChange: input.onChange,
            options: {
              autofocus: false,
              spellChecker: false,
              status: false,
              toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "preview"],
            },
          });
        },
      });
    });
    return cms;
  },

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
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  {
                    type: "string",
                    name: "logoText",
                    label: "Text loga",
                    ui: { component: "simplemde" } // 🚀 Voláme přes registrovaný název
                  },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { 
                        type: "string", 
                        name: "label", 
                        label: "Název odkazu", 
                        ui: { component: "simplemde" } 
                      },
                      { type: "string", name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // 2. HERO
              {
                name: "hero",
                label: "VELKÝ HERO",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "string", name: "heading", label: "Hlavní nadpis (H1)", ui: { component: "simplemde" } },
                  { type: "string", name: "subheading", label: "Podnadpis", ui: { component: "simplemde" } },
                  { type: "string", name: "body", label: "Obsah sekce", ui: { component: "simplemde" } },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string", name: "fontWeight", label: "Tloušťka", options: [{ value: "400", label: "Normální" }, { value: "700", label: "Tučné" }] },
                  { type: "number", name: "pt", label: "Padding Top" },
                  { type: "number", name: "pb", label: "Padding Bottom" }
                ]
              },
              // 3. HEADING
              {
                name: "heading",
                label: "NADPIS (H2)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "string", name: "text", label: "Text nadpisu", ui: { component: "simplemde" } },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" },
                  { type: "number", name: "mt", label: "Margin Top" },
                  { type: "number", name: "mb", label: "Margin Bottom" }
                ]
              },
              // 4. CONTENT
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Interní název bloku" },
                  { type: "string", name: "body", label: "Obsah", ui: { component: "simplemde" } },
                  { type: "string", name: "align", label: "Zarovnání", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});