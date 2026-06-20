import { defineConfig } from "tinacms";

// Pomocné šablony pro barvy textu
const colorTextTemplate = {
  name: "ColorText",
  label: "🎨 Barva písma (Slovo/Písmeno)",
  inline: true,
  fields: [
    { type: "string" as const, name: "text", label: "Text", required: true },
    { type: "string" as const, name: "color", label: "Barva textu", ui: { component: "color" } }
  ]
};

const highlightTextTemplate = {
  name: "HighlightText",
  label: "🖍️ Zvýraznění textu (Zvýrazňovač)",
  inline: true,
  fields: [
    { type: "string" as const, name: "text", label: "Text", required: true },
    { type: "string" as const, name: "bgColor", label: "Barva zvýraznění (Pozadí)", ui: { component: "color" } },
    { type: "string" as const, name: "textColor", label: "Barva písma uvnitř zvýraznění", ui: { component: "color" } }
  ]
};

function createRichTextField(config: { name: string; label: string; ui?: { toolbar?: string[] } }): any {
  // Seznam věcí, které chceme povolit, pokud jsou předány v config.ui.toolbar
  const enabledToolbar = config.ui?.toolbar || [];

  return {
    type: "rich-text" as const,
    parser: { type: "markdown" as const },
    templates: [colorTextTemplate, highlightTextTemplate],
    ...config,
    ui: {
      ...config.ui,
      // Tímto natvrdo skryjeme výchozí tlačítka Tiny, pokud nejsou v našem seznamu
      heading: enabledToolbar.includes("heading"),
      link: enabledToolbar.includes("link"),
      image: enabledToolbar.includes("image"),
      quote: enabledToolbar.includes("quote"),
      ul: enabledToolbar.includes("ul"),
      ol: enabledToolbar.includes("ol"),
      italic: enabledToolbar.includes("italic"),
      bold: enabledToolbar.includes("bold"),
    }
  };
}

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Stránky",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => (document._sys.filename === "home" ? "/" : `/${document._sys.filename}`),
        },
        fields: [
          { type: "string" as const, name: "adminLabel", label: "Interní název (pro admin)", isTitle: true, required: true },
          { type: "string" as const, name: "outerBgColor", label: "Barva pozadí celé stránky", ui: { component: "color" } },
          {
            type: "object" as const,
            list: true,
            name: "blocks",
            label: "Pohyblivé bloky stránky",
            ui: { visualSelector: true },
            templates: [
              // 1. NAVBAR
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                ui: { itemProps: (item: any) => ({ label: item?.adminLabel ? `🧭 Menu: ${item.adminLabel}` : "🧭 NAVBAR (Menu)" }) },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  createRichTextField({
                    name: "logoText",
                    label: "Text loga",
                    ui: { toolbar: ["bold", "italic", "link", "strikethrough", "code", "embed"] }
                  }),
                  { 
                    type: "object" as const, 
                    list: true, 
                    name: "links", 
                    label: "Odkazy v menu", 
                    fields: [
                      createRichTextField({
                        name: "label",
                        label: "Název odkazu",
                        ui: { toolbar: ["bold", "italic", "link", "strikethrough", "code", "embed"] }
                      }),
                      { type: "string" as const, name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // 2. HERO BLOK
              {
                name: "hero",
                label: "VELKÝ HERO",
                ui: {
                  itemProps: (item: any) => ({ label: item?.adminLabel ? `🚀 Hero: ${item.adminLabel}` : "🚀 VELKÝ HERO" }),
                  defaultItem: { align: "center", fontSize: 60, fontWeight: "900", pt: 80, pb: 80 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  createRichTextField({
                    name: "heading",
                    label: "Hlavní nadpis",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  createRichTextField({
                    name: "subheading",
                    label: "Podnadpis",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  createRichTextField({
                    name: "body",
                    label: "Obsah sekce",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  { type: "string" as const, name: "align", label: "Zarovnání obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastní" }] },
                  { type: "string" as const, name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number" as const, name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string" as const, name: "fontWeight", label: "Tloušťka písma", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"},{value:"900",label:"Extra tučné"}] },
                  { type: "number" as const, name: "pt", label: "Vnitřní horní prostor (Padding Top)" },
                  { type: "number" as const, name: "pb", label: "Vnitřní dolní prostor (Padding Bottom)" },
                  { type: "number" as const, name: "pl", label: "Vnitřní levý prostor (Padding Left)" },
                  { type: "number" as const, name: "pr", label: "Vnitřní pravý prostor (Padding Right)" },
                  { type: "number" as const, name: "mt", label: "Vnější horní odsazení (Margin Top)" },
                  { type: "number" as const, name: "mb", label: "Vnější dolní odsazení (Margin Bottom)" },
                  { type: "number" as const, name: "ml", label: "Vnější levé odsazení (Margin Left)" },
                  { type: "number" as const, name: "mr", label: "Vnější pravé odsazení (Margin Right)" }
                ]
              },
              // 3. HEADING BLOK
              {
                name: "heading",
                label: "NADPIS (H2)",
                ui: {
                  itemProps: (item: any) => ({ label: item?.adminLabel ? `📝 Nadpis: ${item.adminLabel}` : "📝 NADPIS (H2)" }),
                  defaultItem: { align: "left", fontSize: 36, fontWeight: "700", mb: 20 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  createRichTextField({
                    name: "text",
                    label: "Text nadpisu",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  { type: "string" as const, name: "align", label: "Zarovnání obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastní" }] },
                  { type: "string" as const, name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number" as const, name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string" as const, name: "fontWeight", label: "Tloušťka písma", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"},{value:"900",label:"Extra tučné"}] },
                  { type: "number" as const, name: "pt", label: "Vnitřní horní prostor (Padding Top)" },
                  { type: "number" as const, name: "pb", label: "Vnitřní dolní prostor (Padding Bottom)" },
                  { type: "number" as const, name: "pl", label: "Vnitřní levý prostor (Padding Left)" },
                  { type: "number" as const, name: "pr", label: "Vnitřní pravý prostor (Padding Right)" },
                  { type: "number" as const, name: "mt", label: "Vnější horní odsazení (Margin Top)" },
                  { type: "number" as const, name: "mb", label: "Vnější dolní odsazení (Margin Bottom)" },
                  { type: "number" as const, name: "ml", label: "Vnější levé odsazení (Margin Left)" },
                  { type: "number" as const, name: "mr", label: "Vnější pravé odsazení (Margin Right)" }
                ]
              },
              // 4. CONTENT BLOK
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                ui: {
                  itemProps: (item: any) => ({ label: item?.adminLabel ? `📖 Text: ${item.adminLabel}` : "📖 TEXTOVÝ OBSAH (Rich Text)" }),
                  defaultItem: { align: "left", fontSize: 18, fontWeight: "400", mb: 16 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  createRichTextField({
                    name: "body",
                    label: "Obsah",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  { type: "string" as const, name: "align", label: "Zarovnání obsahu a textu", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastní" }] },
                  { type: "string" as const, name: "textColor", label: "Barva textu", ui: { component: "color" } },
                  { type: "number" as const, name: "fontSize", label: "Velikost písma (px)" },
                  { type: "string" as const, name: "fontWeight", label: "Tloušťka písma", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"}] },
                  { type: "number" as const, name: "pt", label: "Vnitřní horní prostor (Padding Top)" },
                  { type: "number" as const, name: "pb", label: "Vnitřní dolní prostor (Padding Bottom)" },
                  { type: "number" as const, name: "pl", label: "Vnitřní levý prostor (Padding Left)" },
                  { type: "number" as const, name: "pr", label: "Vnitřní pravý prostor (Padding Right)" },
                  { type: "number" as const, name: "mt", label: "Vnější horní odsazení (Margin Top)" },
                  { type: "number" as const, name: "mb", label: "Vnější dolní odsazení (Margin Bottom)" },
                  { type: "number" as const, name: "ml", label: "Vnější levé odsazení (Margin Left)" },
                  { type: "number" as const, name: "mr", label: "Vnější pravé odsazení (Margin Right)" }
                ]
              },
              // 5. CTA TLAČÍTKO
              {
                name: "cta",
                label: "TLAČÍTKO (CTA)",
                ui: {
                  itemProps: (item: any) => ({ label: item?.adminLabel ? `🔗 Tlačítko: ${item.adminLabel}` : "🔗 TLAČÍTKO (CTA)" }),
                  defaultItem: { align: "center", fontSize: 16, fontWeight: "700", pt: 14, pb: 14, pl: 28, pr: 28, btnBgColor: "#2563eb", btnTextColor: "#ffffff" }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  createRichTextField({
                    name: "title",
                    label: "Text tlačítka",
                    ui: { toolbar: ["bold", "italic", "link", "strikethrough", "code", "embed"] }
                  }),
                  { type: "string" as const, name: "link", label: "Odkaz" },
                  { type: "string" as const, name: "align", label: "Zarovnání tlačítka", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "Střed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastní" }] },
                  { type: "string" as const, name: "btnBgColor", label: "Barva pozadí tlačítka", ui: { component: "color" } },
                  { type: "string" as const, name: "btnTextColor", label: "Barva textu uvnitř tlačítka", ui: { component: "color" } },
                  { type: "number" as const, name: "fontSize", label: "Velikost písma textu (px)" },
                  { type: "string" as const, name: "fontWeight", label: "Tloušťka písma tlačítka", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"}] },
                  { type: "number" as const, name: "pt", label: "Vnitřní horní prostor (Padding Top) tlačítka" },
                  { type: "number" as const, name: "pb", label: "Vnitřní dolní prostor (Padding Bottom) tlačítka" },
                  { type: "number" as const, name: "pl", label: "Vnitřní levý prostor (Padding Left) tlačítka" },
                  { type: "number" as const, name: "pr", label: "Vnitřní pravý prostor (Padding Right) tlačítka" },
                  { type: "number" as const, name: "mt", label: "Vnější horní odsazení celého bloku (Margin Top)" },
                  { type: "number" as const, name: "mb", label: "Vnější dolní odsazení celého bloku (Margin Bottom)" },
                  { type: "number" as const, name: "ml", label: "Vnější levé odsazení celého bloku (Margin Left)" },
                  { type: "number" as const, name: "mr", label: "Vnější pravé odsazení celého bloku (Margin Right)" }
                ]
              },
              // 6. OBRÁZEK
              {
                name: "image",
                label: "IMAGE (Obrázek)",
                ui: {
                  itemProps: (item: any) => ({ label: item?.adminLabel ? `🖼️ Obrázek: ${item.adminLabel}` : "🖼️ IMAGE (Obrázek)" }),
                  defaultItem: { align: "center", borderRadius: 0, mt: 20, mb: 20 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "image" as const, name: "url", label: "Soubor obrázku" },
                  { type: "string" as const, name: "caption", label: "Popisek obrázku" },
                  createRichTextField({
                    name: "body",
                    label: "Detailní text pod obrázkem",
                    ui: { toolbar: ["heading", "bold", "italic", "link", "strikethrough", "code", "code_block", "embed"] }
                  }),
                  { type: "string" as const, name: "align", label: "Zarovnání obrázku", options: [{value:"left",label:"Vlevo"},{value:"center",label:"Střed"},{value:"right",label:"Vpravo"},{value:"custom",label:"Vlastní"}] },
                  { type: "number" as const, name: "mt", label: "Horní odsazení (Margin Top)" },
                  { type: "number" as const, name: "mb", label: "Dolní odsazení (Margin Bottom)" },
                  { type: "number" as const, name: "pl", label: "Levé odsazení (Padding Left)" },
                  { type: "number" as const, name: "pr", label: "Pravé odsazení (Padding Right)" },
                  { type: "number" as const, name: "borderRadius", label: "Zaoblení rohů (px)" }
                ]
              }
            ],
          },
        ],
      },
    ],
  },
});