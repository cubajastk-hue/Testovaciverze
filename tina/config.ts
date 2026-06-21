import React from "react";
import { defineConfig } from "tinacms";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // DŮLEŽITÉ: Načte styly pro ikonky a editor

// Vlastní komponenta, která nahradí nudnou textareu za krásný editor
const CustomMarkdownEditor = React.lazy(() =>
  Promise.resolve({
    default: ({ input }: any) => (
      <div style={{ paddingTop: "0.5rem", marginBottom: "1rem" }}>
        <SimpleMDE
          value={input.value || ""}
          onChange={input.onChange}
          options={{
            autofocus: false,
            spellChecker: false,
            status: false, // Schová spodní lištu s počtem slov (čistší vzhled)
            toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "preview"], // Jen užitečné ikony
          }}
        />
      </div>
    ),
  })
);

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
                    ui: { component: CustomMarkdownEditor } // 🚀 Náš nový editor
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
                        ui: { component: CustomMarkdownEditor } // 🚀 Náš nový editor
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
                  { type: "string", name: "heading", label: "Hlavní nadpis (H1)", ui: { component: CustomMarkdownEditor } },
                  { type: "string", name: "subheading", label: "Podnadpis", ui: { component: CustomMarkdownEditor } },
                  { type: "string", name: "body", label: "Obsah sekce", ui: { component: CustomMarkdownEditor } },
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
                  { type: "string", name: "text", label: "Text nadpisu", ui: { component: CustomMarkdownEditor } },
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
                  { type: "string", name: "body", label: "Obsah", ui: { component: CustomMarkdownEditor } },
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