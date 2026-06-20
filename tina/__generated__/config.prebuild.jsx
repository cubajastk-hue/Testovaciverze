// tina/config.ts
import { defineConfig } from "tinacms";
var colorTextTemplate = {
  name: "ColorText",
  label: "\u{1F3A8} Barva p\xEDsma (Slovo/P\xEDsmeno)",
  inline: true,
  fields: [
    { type: "string", name: "text", label: "Text", required: true },
    { type: "string", name: "color", label: "Barva textu", ui: { component: "color" } }
  ]
};
var highlightTextTemplate = {
  name: "HighlightText",
  label: "\u{1F58D}\uFE0F Zv\xFDrazn\u011Bn\xED textu (Zv\xFDraz\u0148ova\u010D)",
  inline: true,
  fields: [
    { type: "string", name: "text", label: "Text", required: true },
    { type: "string", name: "bgColor", label: "Barva zv\xFDrazn\u011Bn\xED", ui: { component: "color" } },
    { type: "string", name: "textColor", label: "Barva p\xEDsma", ui: { component: "color" } }
  ]
};
function createCustomRichText(name, label, allowedTools) {
  return {
    type: "rich-text",
    name,
    label,
    templates: [colorTextTemplate, highlightTextTemplate],
    ui: {
      // Striktní definice ikon pro editor
      toolbar: allowedTools,
      heading: allowedTools.includes("heading"),
      image: allowedTools.includes("image"),
      quote: allowedTools.includes("quote"),
      ul: allowedTools.includes("ul"),
      ol: allowedTools.includes("ol"),
      code_block: allowedTools.includes("code_block")
    }
  };
}
var navbarBlock = {
  name: "navbar",
  label: "NAVBAR (Menu)",
  ui: { itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F9ED} Menu: ${item.adminLabel}` : "\u{1F9ED} NAVBAR (Menu)" }) },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
    createCustomRichText("logoText", "Text loga", ["bold", "italic", "link", "code"]),
    {
      type: "object",
      list: true,
      name: "links",
      label: "Odkazy v menu",
      fields: [
        createCustomRichText("label", "N\xE1zev odkazu", ["bold", "italic", "link", "code"]),
        { type: "string", name: "url", label: "Adresa" }
      ]
    }
  ]
};
var heroBlock = {
  name: "hero",
  label: "VELK\xDD HERO",
  ui: {
    itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F680} Hero: ${item.adminLabel}` : "\u{1F680} VELK\xDD HERO" }),
    defaultItem: { align: "center", fontSize: 60, fontWeight: "900", pt: 80, pb: 80 }
  },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
    createCustomRichText("heading", "Hlavn\xED nadpis (H1)", ["heading", "bold", "italic", "link", "code"]),
    createCustomRichText("subheading", "Podnadpis", ["heading", "bold", "italic", "link", "code"]),
    createCustomRichText("body", "Obsah sekce", ["heading", "bold", "italic", "link", "image", "code", "code_block"]),
    { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
    { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
    { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
    { type: "string", name: "fontWeight", label: "Tlou\u0161tka", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extra tu\u010Dn\xE9" }] },
    { type: "number", name: "pt", label: "Padding Top" },
    { type: "number", name: "pb", label: "Padding Bottom" },
    { type: "number", name: "pl", label: "Padding Left" },
    { type: "number", name: "pr", label: "Padding Right" },
    { type: "number", name: "mt", label: "Margin Top" },
    { type: "number", name: "mb", label: "Margin Bottom" }
  ]
};
var headingBlock = {
  name: "heading",
  label: "NADPIS (H2)",
  ui: { itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F4DD} Nadpis: ${item.adminLabel}` : "\u{1F4DD} NADPIS (H2)" }), defaultItem: { align: "left", fontSize: 36, fontWeight: "700", mb: 20 } },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
    createCustomRichText("text", "Text nadpisu", ["heading", "bold", "italic", "link"]),
    { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
    { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
    { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
    { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }] },
    { type: "number", name: "mt", label: "Margin Top" },
    { type: "number", name: "mb", label: "Margin Bottom" }
  ]
};
var contentBlock = {
  name: "content",
  label: "TEXTOV\xDD OBSAH",
  ui: { itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F4D6} Text: ${item.adminLabel}` : "\u{1F4D6} TEXTOV\xDD OBSAH" }), defaultItem: { align: "left", fontSize: 18, fontWeight: "400", mb: 16 } },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
    createCustomRichText("body", "Obsah", ["heading", "bold", "italic", "link", "image", "ul", "ol"]),
    { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
    { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
    { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
    { type: "number", name: "mt", label: "Margin Top" },
    { type: "number", name: "mb", label: "Margin Bottom" }
  ]
};
var ctaBlock = {
  name: "cta",
  label: "TLA\u010C\xCDTKO (CTA)",
  ui: { itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F517} Tla\u010D\xEDtko: ${item.adminLabel}` : "\u{1F517} TLA\u010C\xCDTKO (CTA)" }) },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
    createCustomRichText("title", "Text tla\u010D\xEDtka", ["bold", "italic"]),
    { type: "string", name: "link", label: "Odkaz" },
    { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] },
    { type: "string", name: "btnBgColor", label: "Barva pozad\xED", ui: { component: "color" } },
    { type: "string", name: "btnTextColor", label: "Barva textu", ui: { component: "color" } }
  ]
};
var imageBlock = {
  name: "image",
  label: "IMAGE (Obr\xE1zek)",
  ui: { itemProps: (item) => ({ label: item?.adminLabel ? `\u{1F5BC}\uFE0F Obr\xE1zek: ${item.adminLabel}` : "\u{1F5BC}\uFE0F IMAGE (Obr\xE1zek)" }) },
  fields: [
    { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku" },
    { type: "image", name: "url", label: "Soubor obr\xE1zku" },
    { type: "string", name: "caption", label: "Popisek obr\xE1zku" },
    createCustomRichText("body", "Text pod obr\xE1zkem", ["bold", "italic", "link"]),
    { type: "string", name: "align", label: "Zarovn\xE1n\xED", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }] }
  ]
};
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Str\xE1nky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => document._sys.filename === "home" ? "/" : `/${document._sys.filename}`
        },
        fields: [
          { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev", isTitle: true, required: true },
          { type: "string", name: "outerBgColor", label: "Barva pozad\xED str\xE1nky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: { visualSelector: true },
            templates: [navbarBlock, heroBlock, headingBlock, contentBlock, ctaBlock, imageBlock]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
