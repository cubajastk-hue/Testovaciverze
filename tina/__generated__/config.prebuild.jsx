// tina/config.ts
import { defineConfig } from "tinacms";

// tina/TipTapEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { jsx, jsxs } from "react/jsx-runtime";
var TipTapEditor = ({ input, field }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank" } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true })
    ],
    content: input.value || "",
    onUpdate: ({ editor: editor2 }) => {
      input.onChange(editor2.getHTML());
    }
  });
  if (!editor) return null;
  const setFontSize = (size) => {
    if (size === "normal") {
      editor.chain().focus().unsetMark("textStyle").run();
    } else {
      editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    }
  };
  return jsxs("div", { style: { border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", background: "#ffffff" }, children: [
    jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", padding: "8px", background: "#f8fafc", borderBottom: "1px solid #cbd5e1" }, children: [
      jsxs(
        "select",
        {
          onChange: (e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val) }).run();
          },
          value: editor.isActive("paragraph") ? "p" : editor.isActive("heading", { level: 1 }) ? "1" : editor.isActive("heading", { level: 2 }) ? "2" : editor.isActive("heading", { level: 3 }) ? "3" : editor.isActive("heading", { level: 4 }) ? "4" : editor.isActive("heading", { level: 5 }) ? "5" : editor.isActive("heading", { level: 6 }) ? "6" : "p",
          style: { padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" },
          children: [
            jsx("option", { value: "p", children: "Odstavec (p)" }),
            jsx("option", { value: "1", children: "Nadpis H1" }),
            jsx("option", { value: "2", children: "Nadpis H2" }),
            jsx("option", { value: "3", children: "Nadpis H3" }),
            jsx("option", { value: "4", children: "Nadpis H4" }),
            jsx("option", { value: "5", children: "Nadpis H5" }),
            jsx("option", { value: "6", children: "Nadpis H6" })
          ]
        }
      ),
      jsxs(
        "select",
        {
          onChange: (e) => setFontSize(e.target.value),
          style: { padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" },
          children: [
            jsx("option", { value: "normal", children: "Norm\xE1ln\xED velikost" }),
            jsx("option", { value: "12px", children: "Mal\xE9 (12px)" }),
            jsx("option", { value: "14px", children: "St\u0159edn\xED (14px)" }),
            jsx("option", { value: "18px", children: "Velk\xE9 (18px)" }),
            jsx("option", { value: "24px", children: "Extra velk\xE9 (24px)" }),
            jsx("option", { value: "32px", children: "Ob\u0159\xED (32px)" })
          ]
        }
      ),
      jsx("div", { style: { width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" } }),
      jsx(
        "button",
        {
          type: "button",
          onClick: () => editor.chain().focus().toggleBold().run(),
          style: { padding: "4px 8px", fontWeight: "bold", background: editor.isActive("bold") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "B"
        }
      ),
      jsx(
        "button",
        {
          type: "button",
          onClick: () => editor.chain().focus().toggleItalic().run(),
          style: { padding: "4px 8px", fontStyle: "italic", background: editor.isActive("italic") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "I"
        }
      ),
      jsx("div", { style: { width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" } }),
      jsxs("div", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
        jsx("span", { style: { fontSize: "11px", color: "#64748b" }, children: "Text:" }),
        jsx(
          "input",
          {
            type: "color",
            onInput: (e) => editor.chain().focus().setColor(e.target.value).run(),
            value: editor.getAttributes("textStyle").color || "#000000",
            style: { border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }
          }
        )
      ] }),
      jsxs("div", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
        jsx("span", { style: { fontSize: "11px", color: "#64748b" }, children: "Fixa:" }),
        jsx(
          "input",
          {
            type: "color",
            onInput: (e) => editor.chain().focus().setHighlight({ color: e.target.value }).run(),
            style: { border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }
          }
        ),
        jsx(
          "button",
          {
            type: "button",
            onClick: () => editor.chain().focus().unsetHighlight().run(),
            style: { fontSize: "10px", padding: "2px 4px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
            children: "X"
          }
        )
      ] })
    ] }),
    jsx("div", { style: { padding: "12px", minHeight: "150px" }, children: jsx(EditorContent, { editor }) })
  ] });
};

// tina/PositionPicker.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PositionPicker = ({ input, field }) => {
  const value = input.value || { top: "0", right: "0", bottom: "0", left: "0" };
  const handleChange = (side, val) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const newValue = {
      ...value,
      [side]: cleanVal || "0"
    };
    input.onChange(newValue);
  };
  return jsxs2("div", { style: { marginBottom: "16px" }, children: [
    jsx2("label", { style: { display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }, children: field.label || "Pozice (px)" }),
    jsxs2("div", { style: {
      position: "relative",
      width: "100%",
      maxWidth: "320px",
      height: "140px",
      background: "#f1f5f9",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box"
    }, children: [
      jsx2("span", { style: { position: "absolute", top: "8px", left: "12px", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", letterSpacing: "0.5px" }, children: "POSITION" }),
      jsxs2("div", { style: { position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px" }, children: [
        jsx2(
          "input",
          {
            type: "text",
            value: value.top === "0" ? "" : value.top,
            placeholder: "0",
            onChange: (e) => handleChange("top", e.target.value),
            style: { width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }
          }
        ),
        jsx2("span", { style: { fontSize: "11px", color: "#64748b" }, children: "px" })
      ] }),
      jsxs2("div", { style: { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "2px" }, children: [
        jsx2(
          "input",
          {
            type: "text",
            value: value.left === "0" ? "" : value.left,
            placeholder: "0",
            onChange: (e) => handleChange("left", e.target.value),
            style: { width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }
          }
        ),
        jsx2("span", { style: { fontSize: "11px", color: "#64748b" }, children: "px" })
      ] }),
      jsx2("div", { style: {
        width: "110px",
        height: "40px",
        background: "#ef4444",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.06)"
      }, children: jsx2("span", { style: { color: "#ffffff", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px" }, children: field.name === "margin" ? "MARGIN" : "PADDING" }) }),
      jsxs2("div", { style: { position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "2px" }, children: [
        jsx2(
          "input",
          {
            type: "text",
            value: value.right === "0" ? "" : value.right,
            placeholder: "0",
            onChange: (e) => handleChange("right", e.target.value),
            style: { width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }
          }
        ),
        jsx2("span", { style: { fontSize: "11px", color: "#64748b" }, children: "px" })
      ] }),
      jsxs2("div", { style: { position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2px" }, children: [
        jsx2(
          "input",
          {
            type: "text",
            value: value.bottom === "0" ? "" : value.bottom,
            placeholder: "0",
            onChange: (e) => handleChange("bottom", e.target.value),
            style: { width: "38px", height: "24px", textAlign: "center", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12px", outline: "none" }
          }
        ),
        jsx2("span", { style: { fontSize: "11px", color: "#64748b" }, children: "px" })
      ] })
    ] })
  ] });
};

// tina/config.ts
var config_default = defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
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
        // 🚀 FIX: Přesný router, který opraví 404 v Live Editing iframe!
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return `/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sekce str\xE1nky",
            ui: {
              itemProps: (item) => {
                return { label: item?.internalName || "TEXTOV\xDD OBSAH" };
              }
            },
            templates: [
              {
                name: "textContent",
                label: "TEXTOV\xDD OBSAH",
                fields: [
                  {
                    type: "string",
                    name: "internalName",
                    label: "Intern\xED n\xE1zev bloku"
                  },
                  {
                    type: "string",
                    name: "body",
                    label: "Obsah",
                    ui: {
                      component: TipTapEditor,
                      toolbar: ["heading", "bold", "italic", "quote", "bulletList", "textColor", "highlight"]
                    }
                  },
                  {
                    type: "object",
                    name: "padding",
                    label: "Vnit\u0159n\xED odsazen\xED (padding - px)",
                    ui: {
                      component: PositionPicker
                    },
                    fields: [
                      { type: "string", name: "top" },
                      { type: "string", name: "right" },
                      { type: "string", name: "bottom" },
                      { type: "string", name: "left" }
                    ]
                  },
                  {
                    type: "object",
                    name: "margin",
                    label: "Vn\u011Bj\u0161\xED odsazen\xED (margin - px)",
                    ui: {
                      component: PositionPicker
                    },
                    fields: [
                      { type: "string", name: "top" },
                      { type: "string", name: "right" },
                      { type: "string", name: "bottom" },
                      { type: "string", name: "left" }
                    ]
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
