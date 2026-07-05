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
  const [isBulletList, setIsBulletList] = useState(false);

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
    setIsBulletList(editor.isActive("bulletList"));

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

  // Nastylování přesně podle tvého obrázku
  const selectStyle = { padding: "4px 2px", fontSize: "14px", border: "none", background: "transparent", cursor: "pointer", color: "#475569", outline: "none", fontWeight: "600", fontFamily: "inherit" };
  const btnStyle = (active: boolean) => ({ padding: "6px 8px", fontSize: "15px", fontWeight: "700", background: active ? "#f1f5f9" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", color: active ? "#0f172a" : "#475569", outline: "none", transition: "all 0.15s ease", fontFamily: "inherit" });
  const dividerStyle = { width: "1px", height: "18px", background: "#e2e8f0", margin: "0 6px" };

  return (
    <div style={{ marginTop: "12px", width: "100%", position: "relative" }}>
      
      {/* 🚀 Plovoucí "Pill" Menu přesně podle obrázku */}
      <div style={{ 
        position: "sticky", 
        top: "12px", 
        zIndex: 10, 
        display: "flex", 
        alignItems: "center", 
        gap: "4px", 
        padding: "8px 16px", 
        background: "#ffffff", 
        border: "1px solid #e2e8f0", 
        borderRadius: "50px", // Tohle dělá tu pilulku
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", 
        width: "fit-content",
        margin: "0 auto 16px auto" // Vycentrováno nad editorem
      }}>
        
        <select onChange={(e) => { const val = e.target.value; if (val === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run(); }} value={activeHeading} style={selectStyle}>
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div style={dividerStyle} />

        <select onChange={handleFontSizeChange} value={activeFontSize} style={selectStyle}>
          <option value="normal">Size</option>
          <option value="16px">16px</option>
          <option value="20px">20px</option>
          <option value="32px">32px</option>
        </select>

        <div style={dividerStyle} />

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(isBold)}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ ...btnStyle(isItalic), fontStyle: "italic", fontFamily: "serif" }}>I</button>
        
        <div style={dividerStyle} />
        
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={{ ...btnStyle(isBulletList), display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "16px", fontWeight: "normal" }}>≡</span> List
        </button>

        <div style={dividerStyle} />

        {/* 🎨 Černé kolečko pro barvu textu ('A') */}
        <div style={{ position: "relative", width: "26px", height: "26px", borderRadius: "50%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "4px" }}>
          <span style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", pointerEvents: "none" }}>A</span>
          <input 
            type="color" 
            onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()} 
            value={activeColor} 
            style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} 
          />
        </div>

        {/* 🖍 Bílé kolečko s tužkou pro zvýraznění */}
        <div style={{ position: "relative", width: "26px", height: "26px", borderRadius: "50%", background: "#ffffff", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "6px" }}>
          <span style={{ fontSize: "12px", color: "#475569", pointerEvents: "none", transform: "rotate(-45deg)" }}>✏️</span>
          <input 
            type="color" 
            onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} 
            value={activeHighlight} 
            style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer" }} 
          />
        </div>

        {/* ✕ Odstranit zvýraznění */}
        <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} style={{ fontSize: "14px", color: "#94a3b8", border: "none", background: "none", cursor: "pointer", marginLeft: "4px", padding: "4px 6px" }}>✕</button>

      </div>

      {/* EDITOR KONTEJNER */}
      <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", background: "#ffffff", width: "100%", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)" }}>
        <style>{`
          .ProseMirror:focus { outline: none !important; }
          .ProseMirror { word-break: break-word; overflow-wrap: break-word; padding: 32px 40px; min-height: 350px; color: #0f172a; font-family: ui-sans-serif, system-ui, sans-serif; }
          .ProseMirror p { margin-top: 0; margin-bottom: 0.75rem; line-height: 1.6; }
          .ProseMirror h1 { font-size: 2.2em; margin-top: 0; margin-bottom: 1rem; line-height: 1.2; font-weight: 800; letter-spacing: -0.02em; }
          .ProseMirror h2 { font-size: 1.5em; margin-top: 0; margin-bottom: 0.875rem; font-weight: 700; letter-spacing: -0.01em; }
          .ProseMirror h3 { font-size: 1.2em; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600; }
          .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
          .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
          .ProseMirror > *:last-child { margin-bottom: 0 !important; }
          .ProseMirror mark { padding: 0.1em 0.3em; border-radius: 0.25em; box-decoration-break: clone; }
        `}</style>
        
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};