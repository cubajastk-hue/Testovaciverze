import React, { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Mark, mergeAttributes } from "@tiptap/core";

const FontSize = Mark.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },
  parseHTML() { return [{ style: "font-size" }]; },
  renderHTML({ HTMLAttributes }) { return ["span", mergeAttributes(HTMLAttributes), 0]; },
  addCommands() {
    return {
      setFontSize: (size: string) => ({ commands }: any) => commands.setMark("fontSize", { size }),
      unsetFontSize: () => ({ commands }: any) => commands.unsetMark("fontSize"),
    };
  },
});

export const TipTapEditor = ({ input }: any) => {
  const [activeFontSize, setActiveFontSize] = useState("normal");
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeHighlight, setActiveHighlight] = useState("#ffffff");
  const [activeHeading, setActiveHeading] = useState("p");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false); // Živý stav pro seznam

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank" } }),
      TextStyle, Color, Highlight.configure({ multicolor: true }), FontSize,
    ],
    content: input.value || "",
    onUpdate: ({ editor }) => input.onChange(editor.getHTML()),
  });

  const updateToolbar = useCallback(() => {
    if (!editor) return;
    setActiveFontSize(editor.getAttributes("fontSize").size || "normal");
    setActiveColor(editor.getAttributes("textStyle").color || "#000000");
    setActiveHighlight(editor.getAttributes("highlight").color || "#ffffff");
    
    setIsBold(editor.isActive("bold"));
    setIsItalic(editor.isActive("italic"));
    setIsBulletList(editor.isActive("bulletList")); // 🚀 Aktualizace stavu seznamu

    if (editor.isActive("heading", { level: 1 })) setActiveHeading("1");
    else if (editor.isActive("heading", { level: 2 })) setActiveHeading("2");
    else if (editor.isActive("heading", { level: 3 })) setActiveHeading("3");
    else setActiveHeading("p");
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", updateToolbar);
    editor.on("selectionUpdate", updateToolbar);
    return () => { editor.off("transaction", updateToolbar); editor.off("selectionUpdate", updateToolbar); };
  }, [editor, updateToolbar]);

  if (!editor) return null;

  const handleFontSizeChange = (e: any) => {
    const val = e.target.value;
    if (val === "normal") (editor.commands as any).unsetFontSize();
    else (editor.commands as any).setFontSize(val);
  };

  const selectStyle = { padding: "4px 8px", fontSize: "12px", border: "1px solid #e2e8f0", borderRadius: "4px", background: "#fff", cursor: "pointer", color: "#475569", outline: "none" };
  const btnStyle = (active: boolean) => ({ padding: "4px 8px", fontSize: "12px", fontWeight: "600", background: active ? "#f1f5f9" : "transparent", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer", color: active ? "#0f172a" : "#64748b", outline: "none" });

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "6px", overflow: "hidden", background: "#ffffff", width: "100%", marginTop: "4px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
      <style>{`
        .ProseMirror:focus { outline: none !important; }
        .ProseMirror { word-break: break-word; overflow-wrap: break-word; padding: 16px 20px; min-height: 200px; color: #1e293b; }
        .ProseMirror p { margin-top: 0; margin-bottom: 0.75rem; line-height: 1.6; }
        .ProseMirror h1 { font-size: 2em; margin-top: 0; margin-bottom: 1rem; line-height: 1.2; font-weight: 800; }
        .ProseMirror h2 { font-size: 1.5em; margin-top: 0; margin-bottom: 0.875rem; font-weight: 700; }
        .ProseMirror h3 { font-size: 1.17em; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .ProseMirror > *:last-child { margin-bottom: 0 !important; }
      `}</style>
      
      {/* Ukotvená Framer Light lišta nástrojů */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", padding: "6px 12px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        
        <select onChange={(e) => { const val = e.target.value; if (val === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run(); }} value={activeHeading} style={selectStyle}>
          <option value="p">Odstavec</option>
          <option value="1">Nadpis H1</option>
          <option value="2">Nadpis H2</option>
          <option value="3">Nadpis H3</option>
        </select>

        <select onChange={handleFontSizeChange} value={activeFontSize} style={selectStyle}>
          <option value="normal">Velikost</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="32px">32px</option>
        </select>

        <div style={{ width: "1px", height: "18px", background: "#e2e8f0", margin: "0 2px" }} />

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(isBold)}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(isItalic)}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(isBulletList)}>• Seznam</button>

        <div style={{ width: "1px", height: "18px", background: "#e2e8f0", margin: "0 2px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fff", padding: "2px 4px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>Text</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()} value={activeColor} style={{ border: "none", padding: "0", width: "16px", height: "16px", cursor: "pointer", background: "transparent" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fff", padding: "2px 4px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600" }}>Fixa</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value={activeHighlight} style={{ border: "none", padding: "0", width: "16px", height: "16px", cursor: "pointer", background: "transparent" }} />
          <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} style={{ fontSize: "10px", color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontWeight: "bold" }}>X</button>
        </div>

      </div>

      <EditorContent editor={editor} />
    </div>
  );
};