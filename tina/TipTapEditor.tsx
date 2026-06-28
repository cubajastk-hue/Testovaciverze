import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Extension } from "@tiptap/core";

// 🚀 FIX: Vlastní rozšíření, aby se velikost písma správně propsala do HTML a fungovala na webu
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] } },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

export const TipTapEditor = ({ input, field }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank" } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize, // 🚀 Přidáno rozšíření
    ],
    content: input.value || "",
    onUpdate: ({ editor }) => {
      input.onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const setFontSize = (size: string) => {
    // Zjistíme aktuální barvu textu, abychom o ni nepřišli
    const currentColor = editor.getAttributes("textStyle").color;

    if (size === "normal") {
      // 🚀 FIX: Pokud odebíráme velikost, vrátíme tam zpátky barvu
      if (currentColor) {
        editor.chain().focus().setMark("textStyle", { fontSize: null, color: currentColor }).run();
      } else {
        editor.chain().focus().unsetMark("textStyle").run();
      }
    } else {
      // 🚀 Nastavíme velikost a zachováme stávající barvu
      editor.chain().focus().setMark("textStyle", { fontSize: size, color: currentColor || null }).run();
    }
  };

  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", background: "#ffffff" }}>
      {/* TOOLBAR */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", padding: "8px", background: "#f8fafc", borderBottom: "1px solid #cbd5e1" }}>
        
        {/* DROPDOWN PRO NADPISY */}
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run();
          }}
          value={
            editor.isActive("paragraph") ? "p" :
            editor.isActive("heading", { level: 1 }) ? "1" :
            editor.isActive("heading", { level: 2 }) ? "2" :
            editor.isActive("heading", { level: 3 }) ? "3" :
            editor.isActive("heading", { level: 4 }) ? "4" :
            editor.isActive("heading", { level: 5 }) ? "5" :
            editor.isActive("heading", { level: 6 }) ? "6" : "p"
          }
          style={{ padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
        >
          <option value="p">Odstavec (p)</option>
          <option value="1">Nadpis H1</option>
          <option value="2">Nadpis H2</option>
          <option value="3">Nadpis H3</option>
          <option value="4">Nadpis H4</option>
          <option value="5">Nadpis H5</option>
          <option value="6">Nadpis H6</option>
        </select>

        {/* DROPDOWN PRO VELIKOST PÍSMA */}
        <select
          onChange={(e) => setFontSize(e.target.value)}
          style={{ padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
        >
          <option value="normal">Normální velikost</option>
          <option value="12px">Malé (12px)</option>
          <option value="14px">Střední (14px)</option>
          <option value="18px">Velké (18px)</option>
          <option value="24px">Extra velké (24px)</option>
          <option value="32px">Obří (32px)</option>
        </select>

        <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" }} />

        {/* BOLD / ITALIC */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: "4px 8px", fontWeight: "bold", background: editor.isActive("bold") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: "4px 8px", fontStyle: "italic", background: editor.isActive("italic") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          I
        </button>

        <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" }} />

        {/* BARVA TEXTU */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Text:</span>
          <input
            type="color"
            onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()}
            value={editor.getAttributes("textStyle").color || "#000000"}
            style={{ border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }}
          />
        </div>

        {/* FIXA / HIGHLIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Fixa:</span>
          <input
            type="color"
            onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
            style={{ border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }}
          />
          <button 
            type="button" 
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            style={{ fontSize: "10px", padding: "2px 4px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            X
          </button>
        </div>

      </div>

      {/* TEXT AREA */}
      <div style={{ padding: "12px", minHeight: "150px" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};