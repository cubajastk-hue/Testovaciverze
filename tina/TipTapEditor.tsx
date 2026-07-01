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
  addOptions() {
    return { types: ["textStyle"] };
  },
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
  parseHTML() {
    return [{ style: "font-size" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setFontSize: (size: string) => ({ commands }: any) => {
        return commands.setMark("fontSize", { size });
      },
      unsetFontSize: () => ({ commands }: any) => {
        return commands.unsetMark("fontSize");
      },
    };
  },
});

export const TipTapEditor = ({ input }: any) => {
  const [activeFontSize, setActiveFontSize] = useState("normal");
  const [activeColor, setActiveColor] = useState("#000000");
  // 🚀 FIX: Výchozí barva fixy je nyní bílá
  const [activeHighlight, setActiveHighlight] = useState("#ffffff");
  const [activeHeading, setActiveHeading] = useState("p");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank" } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize,
    ],
    content: input.value || "",
    onUpdate: ({ editor }) => {
      input.onChange(editor.getHTML());
    },
  });

  const updateToolbar = useCallback(() => {
    if (!editor) return;
    
    setActiveFontSize(editor.getAttributes("fontSize").size || "normal");
    setActiveColor(editor.getAttributes("textStyle").color || "#000000");
    // Pokud text nemá zvýraznění, ukážeme bílou fixu
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
    return () => {
      editor.off("transaction", updateToolbar);
      editor.off("selectionUpdate", updateToolbar);
    };
  }, [editor, updateToolbar]);

  if (!editor) return null;

  const handleFontSizeChange = (e: any) => {
    const val = e.target.value;
    if (val === "normal") {
      (editor.commands as any).unsetFontSize();
    } else {
      (editor.commands as any).setFontSize(val);
    }
  };

  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", background: "#ffffff" }}>
      {/* 🚀 FIX: Tento globální styl odstraňuje ten černý rámeček z editoru */}
      <style>{`
        .ProseMirror:focus { outline: none !important; }
        .ProseMirror p { margin-bottom: 0.75rem; line-height: 1.6; }
      `}</style>
      
      {/* TOOLBAR */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", padding: "8px", background: "#f8fafc", borderBottom: "1px solid #cbd5e1" }}>
        
        <select onChange={(e) => { const val = e.target.value; if (val === "p") editor.chain().focus().setParagraph().run(); else editor.chain().focus().toggleHeading({ level: parseInt(val) as any }).run(); }} value={activeHeading} style={{ padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>
          <option value="p">Odstavec (p)</option>
          <option value="1">Nadpis H1</option>
          <option value="2">Nadpis H2</option>
          <option value="3">Nadpis H3</option>
          <option value="4">Nadpis H4</option>
          <option value="5">Nadpis H5</option>
          <option value="6">Nadpis H6</option>
        </select>

        <select onChange={handleFontSizeChange} value={activeFontSize} style={{ padding: "4px 8px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>
          <option value="normal">Normální velikost</option>
          <option value="12px">Malé (12px)</option>
          <option value="14px">Střední (14px)</option>
          <option value="16px">Standardní (16px)</option>
          <option value="18px">Velké (18px)</option>
          <option value="20px">Větší (20px)</option>
          <option value="24px">Extra velké (24px)</option>
          <option value="32px">Obří (32px)</option>
        </select>

        <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" }} />

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={{ padding: "4px 8px", fontWeight: "bold", background: isBold ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={{ padding: "4px 8px", fontStyle: "italic", background: isItalic ? "#e2e8f0" : "transparent", border: "none", borderRadius: "4px", cursor: "pointer" }}>I</button>

        <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 4px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Text:</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setColor(e.target.value).run()} value={activeColor} style={{ border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#64748b" }}>Fixa:</span>
          <input type="color" onInput={(e: any) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value={activeHighlight} style={{ border: "none", padding: "0", width: "20px", height: "20px", cursor: "pointer", background: "transparent" }} />
          <button type="button" onClick={() => editor.chain().focus().unsetHighlight().run()} style={{ fontSize: "10px", padding: "2px 4px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>X</button>
        </div>

      </div>

      <div style={{ padding: "12px", minHeight: "150px" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};