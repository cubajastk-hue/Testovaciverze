// tina/config.ts
import React from "react";
import { defineConfig } from "tinacms";
var KlikaciMarkdownField = ({ input, field }) => {
  const [Editor, setEditor] = React.useState(null);
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
  const handleChange = React.useCallback((value) => {
    input.onChange(value);
  }, [input.onChange]);
  const volbyListy = field.ui?.toolbar || ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link"];
  const mdeOptions = React.useMemo(() => ({
    autofocus: false,
    spellChecker: false,
    status: false,
    toolbar: volbyListy
  }), [volbyListy]);
  if (!Editor) {
    return React.createElement("textarea", {
      ...input,
      value: input.value || "",
      style: { width: "100%", minHeight: "50px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }
    });
  }
  return React.createElement(
    "div",
    { style: { width: "100%", margin: "4px 0 12px 0" } },
    React.createElement("style", null, `
      .custom-mde .CodeMirror {
        height: auto !important;
        min-height: 50px !important;
        border-bottom-left-radius: 6px !important;
        border-bottom-right-radius: 6px !important;
      }
      .custom-mde .editor-toolbar {
        border-top-left-radius: 6px !important;
        border-top-right-radius: 6px !important;
        padding: 4px 8px !important;
      }
      .custom-mde .CodeMirror-scroll {
        min-height: 50px !important;
        overflow-y: hidden !important;
      }
    `),
    React.createElement(
      "div",
      { className: "custom-mde" },
      React.createElement(Editor, {
        value: input.value || "",
        onChange: handleChange,
        options: mdeOptions
      })
    )
  );
};
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
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
            label: "Bloky str\xE1nky",
            templates: [
              // HLAVIČKA (NAVBAR)
              {
                name: "navbar",
                label: "HLAVI\u010CKA (Menu)",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  // 🚀 Přidáno "as any", aby TypeScript nehlásil chybu kvůli vlastnímu parametru toolbar
                  {
                    type: "string",
                    name: "logoText",
                    label: "Text loga",
                    ui: {
                      component: KlikaciMarkdownField,
                      toolbar: ["bold", "italic"]
                    }
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
                        ui: {
                          component: KlikaciMarkdownField,
                          toolbar: ["bold", "italic"]
                        }
                      },
                      { type: "string", name: "url", label: "URL" }
                    ]
                  }
                ]
              },
              // TEXTOVÝ OBSAH
              {
                name: "content",
                label: "TEXTOV\xDD OBSAH",
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
                  // 🚀 Přidáno "as any" i zde
                  {
                    type: "string",
                    name: "body",
                    label: "Obsah",
                    ui: {
                      component: KlikaciMarkdownField,
                      toolbar: ["heading", "bold", "italic", "|", "quote", "unordered-list", "link"]
                    }
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
