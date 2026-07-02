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

    if (editor.isActive("heading", { level: 1 })) setActiveHeading("1");
    else if (editor.isActive("heading", { level: 2 })) setActiveHeading("2");
    else if (editor.isActive("heading", { level: 3 })) setActiveHeading("3");
    else if (editor.isActive("heading", { level: 4 })) setActiveHeading("4");
    else if (editor.isActive("heading", { level: 5 })) setActiveHeading("5");
    else if (editor.isActive("heading", { level: 6 })) setActiveHeading("6");
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

  const selectStyle = { padding: "6px 10px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#fff", cursor: "pointer", outline: "none", color: "#334155" };
  const btnStyle = (active: boolean) => ({ padding: "6px 12px", fontSize: "14px", fontWeight: "bold", background: active ? "#e2e8f0" : "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", color: "#334155" });

  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", background: "#ffffff", width: "100%", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
      <style>{`
        .ProseMirror:focus { outline: none !important; }
        .ProseMirror { word-break: break-word; overflow-wrap: break-word; padding: 16px; min-height: 250px; }
        .ProseMirror p { margin-top: 0; margin-bottom: 0.875rem; line-height: 1.6; }
        .ProseMirror h1 { font-size: 2em; margin-top: 0; margin-bottom: 1rem; line-height: 1.2; font-weight: 800; }
        .ProseMirror h2 { font-size: 1.5em; margin-top: 0; margin-bottom: 0.875rem; font-weight: 700; }
        .ProseMirror h3 { font-size: 1.17em; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600; }
        .ProseMirror h4 { font-size: 1em; margin-top: 0; margin-bottom: 0.5rem; font-weight: 600; }
        .ProseMirror h5 { font-size: 0.83em; margin-top: 0; margin-bottom: 0.5rem; font-weight: 600; }
        .ProseMirror h6 { font-size: 0.67em; margin-top: 0; margin-bottom: 0.5rem; font-weight: 600; }
        
        /* 🚀 FIX: Totální zrušení mezery pod posledním prvkem (i když to je nadpis) */
        .ProseMirror > *:last-child { margin-bottom: 0 !important; }
      `}</style>
      
      {/* 🚀 FIX: Přilepená hlavička (sticky top) a modernější padding/mezery */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", padding: "12px", background: "#f8fafc", borderBottom: "1px solid #cbd5e1", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
        
        <select onChange={(e) => { const val = e.target.value; if (val === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run(); }} value={activeHeading} style={selectStyle}>
          <option value="p">Odstavec</option>
          <option value="1">Nadpis H1</option>
          <option value="2">Nadpis H2</option>
          <option value="3">Nadpis H3</option>
          <option value="4">Nadpis H4</option>
          <option value="5">Nadpis H5</option>
          <option value="6">Nadpis H6</option>
        </select>

        <select onChange={handleFontSizeChange} value={activeFontSize} style={selectStyle}>
          <option value="normal">Normální velikost</option>
          <option value="12px">Malé (12px)</option>
          <option value="14px">Střední (14px)</option>
          <option value="16px">Standardní (16px)</option>
          <option value="18px">Velké (18px)</option>
          <option value="20px">Větší (20px)</option>
          <option value="24px">Extra velké (24px)</option>
          <option value="32px">Obří (32px)</option>
        </select>

        <div style={{ width: "1px", height: "24px", background: "#cbd5e1", margin: "0 4px" }} />

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(isBold)}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ ...btnStyle(isItalic), fontStyle: "italic" }}>I</button>

        <div style={{ width: "1px", height: "24px", background: "#cbd5e1", margin: "0 4px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", padding: "4px 8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
          <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>Text:</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()} value={activeColor} style={{ border: "none", padding: "0", width: "22px", height: "22px", cursor: "pointer", background: "transparent" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", padding: "4px 8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
          <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500 }}>Fixa:</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value={activeHighlight} style={{ border: "none", padding: "0", width: "22px", height: "22px", cursor: "pointer", background: "transparent" }} />
          <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} style={{ fontSize: "12px", padding: "2px 6px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: "4px" }}>X</button>
        </div>

      </div>

      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};