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

  // Zástupný stav pro AI Agenta
  const [aiPrompt, setAiPrompt] = useState("");

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

  const handleAiSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      alert(`Zde by AI agent vygeneroval text na základě: "${aiPrompt}" a vložil ho do editoru.`);
      setAiPrompt("");
    }
  };

  const selectStyle = { padding: "4px 8px", fontSize: "12px", border: "none", background: "transparent", cursor: "pointer", color: "#334155", outline: "none", fontWeight: "500" };
  const btnStyle = (active: boolean) => ({ padding: "4px 8px", fontSize: "14px", fontWeight: "bold", background: active ? "#f1f5f9" : "transparent", border: "none", borderRadius: "6px", cursor: "pointer", color: active ? "#0f172a" : "#475569", outline: "none", transition: "all 0.15s ease" });

  return (
    <div style={{ marginTop: "12px" }}>
      
      {/* 🚀 AI AGENT UI */}
      <div style={{ marginBottom: "16px", position: "relative" }}>
        <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "14px" }}>✨</div>
        <input 
          type="text" 
          placeholder="Zadejte pokyn pro AI agenta (např. 'Napiš úvodní odstavec o výhodách designu')... a stiskněte Enter"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={handleAiSubmit}
          style={{ width: "100%", padding: "10px 12px 10px 36px", fontSize: "13px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#f8fafc", color: "#0f172a", outline: "none", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}
        />
      </div>

      {/* EDITOR KONTEJNER */}
      <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", background: "#ffffff", width: "100%", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)", position: "relative", paddingTop: "50px" }}>
        
        <style>{`
          .ProseMirror:focus { outline: none !important; }
          .ProseMirror { word-break: break-word; overflow-wrap: break-word; padding: 24px; min-height: 250px; color: #0f172a; font-family: ui-sans-serif, system-ui, sans-serif; }
          .ProseMirror p { margin-top: 0; margin-bottom: 0.75rem; line-height: 1.6; }
          .ProseMirror h1 { font-size: 2.2em; margin-top: 0; margin-bottom: 1rem; line-height: 1.2; font-weight: 800; letter-spacing: -0.02em; }
          .ProseMirror h2 { font-size: 1.5em; margin-top: 0; margin-bottom: 0.875rem; font-weight: 700; letter-spacing: -0.01em; }
          .ProseMirror h3 { font-size: 1.2em; margin-top: 0; margin-bottom: 0.75rem; font-weight: 600; }
          .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
          .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
          .ProseMirror > *:last-child { margin-bottom: 0 !important; }
        `}</style>
        
        {/* 🚀 Plovoucí "Pill" Menu inspirované Framerem */}
        <div style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", alignItems: "center", gap: "2px", padding: "4px 8px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)" }}>
          
          <select onChange={(e) => { const val = e.target.value; if (val === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run(); }} value={activeHeading} style={selectStyle}>
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>

          <div style={{ width: "1px", height: "16px", background: "#e2e8f0", margin: "0 4px" }} />

          <select onChange={handleFontSizeChange} value={activeFontSize} style={selectStyle}>
            <option value="normal">Size</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="32px">32px</option>
          </select>

          <div style={{ width: "1px", height: "16px", background: "#e2e8f0", margin: "0 4px" }} />

          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(isBold)}>B</button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ ...btnStyle(isItalic), fontStyle: "italic", fontFamily: "serif" }}>I</button>
          
          <div style={{ width: "1px", height: "16px", background: "#e2e8f0", margin: "0 4px" }} />
          
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={{ ...btnStyle(isBulletList), fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "14px" }}>≡</span> List
          </button>

          <div style={{ width: "1px", height: "16px", background: "#e2e8f0", margin: "0 4px" }} />

          {/* Barva textu */}
          <div style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", zIndex: 1, pointerEvents: "none", color: activeColor === "#000000" ? "#fff" : "#000", mixBlendMode: "difference" }}>A</span>
            <input type="color" onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()} value={activeColor} style={{ position: "absolute", top: "-5px", left: "-5px", width: "40px", height: "40px", border: "none", padding: "0", cursor: "pointer", background: "transparent" }} />
          </div>

          {/* Zvýrazňovač */}
          <div style={{ position: "relative", width: "24px", height: "24px", borderRadius: "50%", overflow: "hidden", border: "1px solid #e2e8f0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "4px" }}>
            <span style={{ fontSize: "12px", zIndex: 1, pointerEvents: "none" }}>🖍</span>
            <input type="color" onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value={activeHighlight} style={{ position: "absolute", top: "-5px", left: "-5px", width: "40px", height: "40px", border: "none", padding: "0", cursor: "pointer", background: "transparent" }} />
          </div>

          {/* Odstranit zvýraznění */}
          <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} style={{ fontSize: "12px", color: "#94a3b8", border: "none", background: "none", cursor: "pointer", marginLeft: "4px", padding: "4px" }}>✕</button>

        </div>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
};