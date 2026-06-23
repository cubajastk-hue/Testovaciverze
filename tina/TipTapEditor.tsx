import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

export const TipTapEditor = ({ input, field }: any) => {
  const povolenyToolbar = field.ui?.toolbar || ["bold", "italic", "heading", "quote", "bulletList", "textColor", "highlight"];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank' } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: input.value || "",
    onUpdate: ({ editor }) => {
      input.onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={{ width: "100%", margin: "4px 0 12px 0", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
      
      {/* LIŠTA S TLAČÍTKY A BARVAMI */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
        
        {povolenyToolbar.includes("bold") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} style={{ width: "32px", height: "32px", fontWeight: "bold", background: editor.isActive("bold") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>B</button>
        )}
        
        {povolenyToolbar.includes("italic") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} style={{ width: "32px", height: "32px", fontStyle: "italic", background: editor.isActive("italic") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>I</button>
        )}
        
        {povolenyToolbar.includes("heading") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} style={{ width: "32px", height: "32px", fontWeight: "bold", background: editor.isActive("heading", { level: 2 }) ? "#e2e8f0" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>H2</button>
        )}
        
        {povolenyToolbar.includes("quote") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} style={{ width: "32px", height: "32px", background: editor.isActive("blockquote") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>❝</button>
        )}

        {povolenyToolbar.includes("bulletList") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} style={{ padding: "0 8px", height: "32px", background: editor.isActive("bulletList") ? "#e2e8f0" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>• Seznam</button>
        )}

        {/* Separátor linka */}
        {(povolenyToolbar.includes("textColor") || povolenyToolbar.includes("highlight")) && (
          <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" }} />
        )}

        {/* VOLBA BARVY TEXTU */}
        {povolenyToolbar.includes("textColor") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ffffff", padding: "2px 6px", borderRadius: "6px", border: "1px solid #e2e8f0", height: "32px", boxSizing: "border-box" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>Text:</span>
            <input
              type="color"
              onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()}
              value={editor.getAttributes("textStyle").color || "#000000"}
              style={{ border: "none", padding: "0", width: "18px", height: "18px", cursor: "pointer", background: "transparent" }}
            />
          </div>
        )}

        {/* VOLBA FIXY (HIGHLIGHT) */}
        {povolenyToolbar.includes("highlight") && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#ffffff", padding: "2px 6px", borderRadius: "6px", border: "1px solid #e2e8f0", height: "32px", boxSizing: "border-box" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>Fixa:</span>
            <input
              type="color"
              onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
              value={editor.getAttributes("highlight").color || "#ffff00"}
              style={{ border: "none", padding: "0", width: "18px", height: "18px", cursor: "pointer", background: "transparent" }}
            />
            {editor.isActive("highlight") && (
              <button 
                onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetHighlight().run(); }} 
                style={{ fontSize: "10px", padding: "2px 4px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                X
              </button>
            )}
          </div>
        )}
      </div>

      {/* TEXTOVÁ PLOCHA */}
      <div style={{ padding: "14px", minHeight: "100px", background: "#ffffff" }}>
        <EditorContent editor={editor} className="custom-tiptap-content" />
      </div>

      <style>{`
        .custom-tiptap-content .ProseMirror { outline: none; min-height: 100px; line-height: 1.6; font-size: 15px; }
        .custom-tiptap-content .ProseMirror p { margin-bottom: 0.5em; }
        .custom-tiptap-content .ProseMirror mark { padding: 2px 4px; borderRadius: 4px; }
      `}</style>
    </div>
  );
};