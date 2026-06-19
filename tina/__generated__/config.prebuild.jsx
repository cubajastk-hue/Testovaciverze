// tina/config.ts
import { defineConfig } from "tinacms";
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
          { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev (pro admin)", isTitle: true, required: true },
          { type: "string", name: "outerBgColor", label: "Barva pozad\xED cel\xE9 str\xE1nky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohybliv\xE9 bloky str\xE1nky",
            ui: {
              visualSelector: true
            },
            templates: [
              // 1. HERO BLOK
              {
                name: "hero",
                label: "VELK\xDD HERO",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F680} Hero: ${item.adminLabel}` : "\u{1F680} VELK\xDD HERO"
                  }),
                  defaultItem: {
                    align: "center",
                    fontSize: 60,
                    fontWeight: "900",
                    pt: 80,
                    pb: 80
                  }
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)", description: "Pojmenuj si sekci, a\u0165 ji v seznamu hned pozn\xE1\u0161." },
                  { type: "string", name: "heading", label: "Hlavn\xED nadpis", description: "Nejv\u011Bt\u0161\xED text na za\u010D\xE1tku sekce" },
                  { type: "string", name: "subheading", label: "Podnadpis", description: "Men\u0161\xED dopl\u0148uj\xEDc\xED text pod hlavn\xEDm nadpisem" },
                  { type: "rich-text", name: "body", label: "Obsah sekce (Rich Text)" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extra tu\u010Dn\xE9" }] },
                  { type: "number", name: "pt", label: "Vnit\u0159n\xED horn\xED prostor (Padding Top)" },
                  { type: "number", name: "pb", label: "Vnit\u0159n\xED doln\xED prostor (Padding Bottom)" },
                  { type: "number", name: "pl", label: "Vnit\u0159n\xED lev\xFD prostor (Padding Left)" },
                  { type: "number", name: "pr", label: "Vnit\u0159n\xED prav\xFD prostor (Padding Right)" },
                  { type: "number", name: "mt", label: "Vn\u011Bj\u0161\xED horn\xED odsazen\xED (Margin Top)" },
                  { type: "number", name: "mb", label: "Vn\u011Bj\u0161\xED doln\xED odsazen\xED (Margin Bottom)" },
                  { type: "number", name: "ml", label: "Vn\u011Bj\u0161\xED lev\xE9 odsazen\xED (Margin Left)" },
                  { type: "number", name: "mr", label: "Vn\u011Bj\u0161\xED prav\xE9 odsazen\xED (Margin Right)" }
                ]
              },
              // 2. HEADING BLOK
              {
                name: "heading",
                label: "NADPIS (H2)",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F4DD} Nadpis: ${item.adminLabel}` : "\u{1F4DD} NADPIS (H2)"
                  }),
                  defaultItem: {
                    align: "left",
                    fontSize: 36,
                    fontWeight: "700",
                    mb: 20
                  }
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
                  { type: "string", name: "text", label: "Text nadpisu" },
                  { type: "rich-text", name: "body", label: "Dopl\u0148uj\xEDc\xED text pod nadpisem (Rich Text)" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extra tu\u010Dn\xE9" }] },
                  { type: "number", name: "pt", label: "Vnit\u0159n\xED horn\xED prostor (Padding Top)" },
                  { type: "number", name: "pb", label: "Vnit\u0159n\xED doln\xED prostor (Padding Bottom)" },
                  { type: "number", name: "pl", label: "Vnit\u0159n\xED lev\xFD prostor (Padding Left)" },
                  { type: "number", name: "pr", label: "Vnit\u0159n\xED prav\xFD prostor (Padding Right)" },
                  { type: "number", name: "mt", label: "Vn\u011Bj\u0161\xED horn\xED odsazen\xED (Margin Top)" },
                  { type: "number", name: "mb", label: "Vn\u011Bj\u0161\xED doln\xED odsazen\xED (Margin Bottom)" },
                  { type: "number", name: "ml", label: "Vn\u011Bj\u0161\xED lev\xE9 odsazen\xED (Margin Left)" },
                  { type: "number", name: "mr", label: "Vn\u011Bj\u0161\xED prav\xE9 odsazen\xED (Margin Right)" }
                ]
              },
              // 3. CONTENT BLOK
              {
                name: "content",
                label: "TEXTOV\xDD OBSAH",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F4D6} Text: ${item.adminLabel}` : "\u{1F4D6} TEXTOV\xDD OBSAH (Rich Text)"
                  }),
                  defaultItem: {
                    align: "left",
                    fontSize: 18,
                    fontWeight: "400",
                    mb: 16
                  }
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
                  { type: "rich-text", name: "body", label: "Obsah (Rich Text)" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "string", name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }] },
                  { type: "number", name: "pt", label: "Vnit\u0159n\xED horn\xED prostor (Padding Top)" },
                  { type: "number", name: "pb", label: "Vnit\u0159n\xED doln\xED prostor (Padding Bottom)" },
                  { type: "number", name: "pl", label: "Vnit\u0159n\xED lev\xFD prostor (Padding Left)" },
                  { type: "number", name: "pr", label: "Vnit\u0159n\xED prav\xFD prostor (Padding Right)" },
                  { type: "number", name: "mt", label: "Vn\u011Bj\u0161\xED horn\xED odsazen\xED (Margin Top)" },
                  { type: "number", name: "mb", label: "Vn\u011Bj\u0161\xED doln\xED odsazen\xED (Margin Bottom)" },
                  { type: "number", name: "ml", label: "Vn\u011Bj\u0161\xED lev\xE9 odsazen\xED (Margin Left)" },
                  { type: "number", name: "mr", label: "Vn\u011Bj\u0161\xED prav\xE9 odsazen\xED (Margin Right)" }
                ]
              },
              // 4. CTA TLAČÍTKO
              {
                name: "cta",
                label: "TLA\u010C\xCDTKO (CTA)",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F517} Tla\u010D\xEDtko: ${item.adminLabel}` : "\u{1F517} TLA\u010C\xCDTKO (CTA)"
                  }),
                  defaultItem: {
                    align: "center",
                    fontSize: 16,
                    fontWeight: "700",
                    pt: 14,
                    pb: 14,
                    pl: 28,
                    pr: 28,
                    btnBgColor: "#2563eb",
                    btnTextColor: "#ffffff"
                  }
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
                  { type: "string", name: "title", label: "Text tla\u010D\xEDtka" },
                  { type: "string", name: "link", label: "Odkaz" },
                  { type: "rich-text", name: "body", label: "Dopl\u0148uj\xEDc\xED text u tla\u010D\xEDtka (Rich Text)" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED tla\u010D\xEDtka", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "string", name: "btnBgColor", label: "Barva pozad\xED tla\u010D\xEDtka", ui: { component: "color" } },
                  { type: "string", name: "btnTextColor", label: "Barva textu uvnit\u0159 tla\u010D\xEDtka", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma textu (px)" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma tla\u010D\xEDtka", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }] },
                  { type: "number", name: "pt", label: "Vnit\u0159n\xED horn\xED prostor (Padding Top) tla\u010D\xEDtka" },
                  { type: "number", name: "pb", label: "Vnit\u0159n\xED doln\xED prostor (Padding Bottom) tla\u010D\xEDtka" },
                  { type: "number", name: "pl", label: "Vnit\u0159n\xED lev\xFD prostor (Padding Left) tla\u010D\xEDtka" },
                  { type: "number", name: "pr", label: "Vnit\u0159n\xED prav\xFD prostor (Padding Right) tla\u010D\xEDtka" },
                  { type: "number", name: "mt", label: "Vn\u011Bj\u0161\xED horn\xED odsazen\xED cel\xE9ho bloku (Margin Top)" },
                  { type: "number", name: "mb", label: "Vn\u011Bj\u0161\xED doln\xED odsazen\xED cel\xE9ho bloku (Margin Bottom)" },
                  { type: "number", name: "ml", label: "Vn\u011Bj\u0161\xED lev\xE9 odsazen\xED cel\xE9ho bloku (Margin Left)" },
                  { type: "number", name: "mr", label: "Vn\u011Bj\u0161\xED prav\xE9 odsazen\xED cel\xE9ho bloku (Margin Right)" }
                ]
              },
              // 5. NAVBAR
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F9ED} Menu: ${item.adminLabel}` : "\u{1F9ED} NAVBAR (Menu)"
                  })
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
                  { type: "string", name: "logoText", label: "Text loga" },
                  { type: "rich-text", name: "body", label: "Dopl\u0148uj\xEDc\xED popis v menu (Rich Text)" },
                  { type: "object", list: true, name: "links", label: "Odkazy v menu", fields: [{ type: "string", name: "label", label: "N\xE1zev odkazu" }, { type: "string", name: "url", label: "Adresa" }] }
                ]
              },
              // 6. OBRÁZEK
              {
                name: "image",
                label: "IMAGE (Obr\xE1zek)",
                ui: {
                  itemProps: (item) => ({
                    label: item?.adminLabel ? `\u{1F5BC}\uFE0F Obr\xE1zek: ${item.adminLabel}` : "\u{1F5BC}\uFE0F IMAGE (Obr\xE1zek)"
                  }),
                  defaultItem: {
                    align: "center",
                    borderRadius: 0,
                    mt: 20,
                    mb: 20
                  }
                },
                fields: [
                  { type: "string", name: "adminLabel", label: "Intern\xED n\xE1zev bloku (Pouze pro admina)" },
                  { type: "image", name: "url", label: "Soubor obr\xE1zku" },
                  { type: "string", name: "caption", label: "Popisek obr\xE1zku" },
                  { type: "rich-text", name: "body", label: "Detailn\xED text pod obr\xE1zkem (Rich Text)" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED obr\xE1zku", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "number", name: "mt", label: "Horn\xED odsazen\xED (Margin Top)" },
                  { type: "number", name: "mb", label: "Doln\xED odsazen\xED (Margin Bottom)" },
                  { type: "number", name: "pl", label: "Lev\xE9 odsazen\xED (Padding Left)" },
                  { type: "number", name: "pr", label: "Prav\xE9 odsazen\xED (Padding Right)" },
                  { type: "number", name: "borderRadius", label: "Zaoblen\xED roh\u016F (px)" }
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
