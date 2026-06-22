import React from "react";
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  
  cmsCallback: (cms) => {
    if (typeof window === "undefined") return cms;

    // Dynamicky načteme editor až v prohlížeči, aby nespadl Vercel build
    Promise.all([
      import("react-simplemde-editor"),
      import("easymde/dist/easymde.min.css" as any)
    ]).then(([SimpleMDEModule]) => {
      const SimpleMDE = SimpleMDEModule.default;

      cms.plugins.add({
        __typename: "FieldPlugin",
        name: "klikaci-markdown",
        Component: ({ input }: any) => {
          return React.createElement(SimpleMDE, {
            value: input.value || "",
            onChange: input.onChange,
            options: {
              autofocus: false,
              spellChecker: false,
              status: false,
              toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link"],
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
                  {
                    type: "string",
                    name: "logoText",
                    label: "Text loga",
                    ui: { component: "klikaci-markdown" }
                  },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { type: "string", name: "label", label: "Název odkazu", ui: { component: "klikaci-markdown" } },
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
                  { type: "string", name: "body", label: "Obsah", ui: { component: "klikaci-markdown" } }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});