import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export const TipTapEditor = ({ input, field }: any) => {
  const povolenyToolbar = field.ui?.toolbar || ["bold", "italic", "heading", "quote", "bulletList", "link"];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank' } }),
    ],
    content: input.value || "",
    onUpdate: ({ editor }) => {
      input.onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={{ width: "100%", margin: "4px 0 12px 0", border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden" }}>
      {/* LIŠTA S TLAČÍTKY */}
      <div style={{ display: "flex", gap: "6px", padding: "8px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", flexWrap: "wrap" }}>
        {povolenyToolbar.includes("bold") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} style={{ padding: "4px 8px", fontWeight: "bold", background: editor.isActive("bold") ? "#cbd5e1" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>B</button>
        )}
        
        {povolenyToolbar.includes("italic") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} style={{ padding: "4px 8px", fontStyle: "italic", background: editor.isActive("italic") ? "#cbd5e1" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>I</button>
        )}
        
        {povolenyToolbar.includes("heading") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} style={{ padding: "4px 8px", fontWeight: "bold", background: editor.isActive("heading", { level: 2 }) ? "#cbd5e1" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>H2</button>
        )}
        
        {povolenyToolbar.includes("quote") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} style={{ padding: "4px 8px", background: editor.isActive("blockquote") ? "#cbd5e1" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>❝</button>
        )}

        {povolenyToolbar.includes("bulletList") && (
          <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} style={{ padding: "4px 8px", background: editor.isActive("bulletList") ? "#cbd5e1" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>• Seznam</button>
        )}
      </div>

      {/* TEXTOVÁ PLOCHA */}
      <div style={{ padding: "12px", minHeight: "80px", background: "#ffffff" }}>
        <EditorContent editor={editor} className="custom-tiptap-content" />
      </div>

      <style>{`
        .custom-tiptap-content .ProseMirror { outline: none; min-height: 80px; line-height: 1.6; }
        .custom-tiptap-content .ProseMirror p { margin-bottom: 0.5em; }
      `}</style>
    </div>
  );
};