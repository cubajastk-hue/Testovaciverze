// tina/config.ts
import React from "react";
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  cmsCallback: (cms) => {
    if (typeof window === "undefined") return cms;
    Promise.all([
      import("react-simplemde-editor"),
      import("easymde/dist/easymde.min.css")
    ]).then(([SimpleMDEModule]) => {
      const SimpleMDE = SimpleMDEModule.default;
      cms.plugins.add({
        __typename: "FieldPlugin",
        name: "klikaci-markdown",
        Component: ({ input }) => {
          return React.createElement(SimpleMDE, {
            value: input.value || "",
            onChange: input.onChange,
            options: {
              autofocus: false,
              spellChecker: false,
              status: false,
              // Nastavení tlačítek, která chceš mít v horní liště
              toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link"]
            }
          });
        }
      });
    });
    return cms;
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Str\xE1nky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => document._sys.filename === "home" ? "/" : `/${document._sys.filename}`
        },
        fields: [
          { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev", isTitle: true, required: true },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Bloky str\xE1nky (P\u0159esouvejte po\u0159ad\xED zde)",
            templates: [
              // --- HLAVIČKA (NAVBAR) ---
              {
                name: "navbar",
                label: "HLAVI\u010CKA (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  {
                    type: "string",
                    // Pro Tinu a Vercel naprosto bezpečný string
                    name: "logoText",
                    label: "Text loga (Podporuje form\xE1tov\xE1n\xED)",
                    ui: { component: "klikaci-markdown" }
                    // Zde mu vnutíte ten klikací editor
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
                        label: "N\xE1zev odkazu",
                        ui: { component: "klikaci-markdown" }
                      },
                      { type: "string", name: "url", label: "Kam odkaz vede (URL)" }
                    ]
                  }
                ]
              },
              // --- TEXTOVÝ OBSAH ---
              {
                name: "content",
                label: "TEXTOV\xDD OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  {
                    type: "string",
                    name: "body",
                    label: "Obsah str\xE1nky",
                    ui: { component: "klikaci-markdown" }
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
