import React from "react";
import { defineConfig } from "tinacms";

// 1. Stabilní konfigurace lišty editoru mimo komponentu
const mdeOptions = {
  autofocus: false,
  spellChecker: false,
  status: false,
  toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link"],
};

// 2. Stabilní komponenta editoru (žádné uskakování kurzoru)
const KlikaciMarkdownField = ({ input }: any) => {
  const [Editor, setEditor] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("react-simplemde-editor"),
        // @ts-ignore
        import("easymde/dist/easymde.min.css")
      ]).then(([module]) => {
        setEditor(() => module.default);
      });
    }
  }, []);

  const handleChange = React.useCallback((value: string) => {
    input.onChange(value);
  }, [input.onChange]);

  if (!Editor) {
    return React.createElement("textarea", {
      ...input,
      value: input.value || "",
      className: "w-full p-2 border rounded",
      style: { width: "100%", minHeight: "150px", padding: "10px" }
    });
  }

  return React.createElement(Editor, {
    value: input.value || "",
    onChange: handleChange,
    options: mdeOptions,
  });
};

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  
  cmsCallback: (cms) => {
    cms.fields.add({
      name: "klikaci-markdown",
      Component: KlikaciMarkdownField,
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
          // Nová verze Tiny používá k nasměrování Live Preview čistě tento router
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