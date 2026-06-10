// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
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
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            return void 0;
          }
        },
        fields: [
          { type: "string", name: "title", label: "N\xE1zev str\xE1nky", isTitle: true, required: true },
          { type: "string", name: "description", label: "Popisek pod nadpisem" },
          {
            type: "string",
            name: "titleAlignment",
            label: "Zarovn\xE1n\xED hlavn\xEDho nadpisu",
            options: [
              { value: "center", label: "Na st\u0159ed" },
              { value: "left", label: "Vlevo" },
              { value: "right", label: "Vpravo" }
            ]
          },
          { type: "string", name: "outerBgColor", label: "Barva pozad\xED str\xE1nky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: { visualSelector: true },
            templates: [
              // 1. NAVBAR
              {
                name: "navbar",
                label: "Naviga\u010Dn\xED li\u0161ta (Navbar)",
                fields: [
                  { type: "string", name: "logoText", label: "Text loga" },
                  {
                    type: "object",
                    list: true,
                    name: "links",
                    label: "Odkazy v menu",
                    fields: [
                      { type: "string", name: "label", label: "N\xE1zev odkazu" },
                      { type: "string", name: "url", label: "Kam vede (URL)" }
                    ]
                  }
                ]
              },
              // 2. HERO
              {
                name: "hero",
                label: "Hlavn\xED velk\xFD blok (Hero)",
                fields: [
                  { type: "string", name: "heading", label: "Hlavn\xED nadpis" },
                  { type: "string", name: "subheading", label: "Podnadpis" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Na st\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu (Hex)" },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma v px" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "normal", label: "Norm\xE1ln\xED" }, { value: "bold", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extr\xE9mn\u011B tlust\xE9" }] },
                  { type: "boolean", name: "italic", label: "Kurz\xEDva" },
                  { type: "number", name: "marginTop", label: "Odsazen\xED shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazen\xED zespoda v px" },
                  { type: "number", name: "paddingLeft", label: "Odsazen\xED zleva v px" },
                  { type: "number", name: "paddingRight", label: "Odsazen\xED zprava v px" }
                ]
              },
              // 3. HEADING
              {
                name: "heading",
                label: "Nadpis (Heading)",
                fields: [
                  { type: "string", name: "text", label: "Text nadpisu" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Na st\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu (Hex)" },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma v px" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "normal", label: "Norm\xE1ln\xED" }, { value: "bold", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extr\xE9mn\u011B tlust\xE9" }] },
                  { type: "boolean", name: "italic", label: "Kurz\xEDva" },
                  { type: "number", name: "marginTop", label: "Odsazen\xED shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazen\xED zespoda v px" },
                  { type: "number", name: "paddingLeft", label: "Odsazen\xED zleva v px" },
                  { type: "number", name: "paddingRight", label: "Odsazen\xED zprava v px" }
                ]
              },
              // 4. CONTENT
              {
                name: "content",
                label: "Textov\xFD obsah (Content)",
                fields: [
                  { type: "rich-text", name: "body", label: "Obsah" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Na st\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "string", name: "textColor", label: "Barva textu (Hex)" },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma v px" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "normal", label: "Norm\xE1ln\xED" }, { value: "bold", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extr\xE9mn\u011B tlust\xE9" }] },
                  { type: "boolean", name: "italic", label: "Kurz\xEDva" },
                  { type: "number", name: "marginTop", label: "Odsazen\xED shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazen\xED zespoda v px" },
                  { type: "number", name: "paddingLeft", label: "Odsazen\xED zleva v px" },
                  { type: "number", name: "paddingRight", label: "Odsazen\xED zprava v px" }
                ]
              },
              // 5. IMAGE
              {
                name: "image",
                label: "Obr\xE1zek (Image)",
                fields: [
                  { type: "image", name: "url", label: "Obr\xE1zek" },
                  { type: "string", name: "caption", label: "Popisek obr\xE1zku" },
                  { type: "number", name: "borderRadius", label: "Zaoblen\xED roh\u016F obr\xE1zku v px" },
                  { type: "number", name: "marginTop", label: "Odsazen\xED shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazen\xED zespoda v px" }
                ]
              },
              // 6. CTA (Tlačítko)
              {
                name: "cta",
                label: "Tla\u010D\xEDtko (Cta)",
                fields: [
                  { type: "string", name: "title", label: "Text tla\u010D\xEDtka" },
                  { type: "string", name: "link", label: "Odkaz (URL)" },
                  { type: "string", name: "btnBgColor", label: "Barva tla\u010D\xEDtka (Hex)", ui: { component: "color" } },
                  { type: "string", name: "btnTextColor", label: "Barva textu tla\u010D\xEDtka (Hex)" },
                  { type: "number", name: "borderRadius", label: "Zaoblen\xED roh\u016F tla\u010D\xEDtka v px" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED tla\u010D\xEDtka", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Na st\u0159ed" }, { value: "right", label: "Vpravo" }] },
                  { type: "number", name: "marginTop", label: "Odsazen\xED shora v px" },
                  { type: "number", name: "marginBottom", label: "Odsazen\xED zespoda v px" },
                  { type: "number", name: "paddingLeft", label: "Odsazen\xED zleva v px" },
                  { type: "number", name: "paddingRight", label: "Odsazen\xED zprava v px" }
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
