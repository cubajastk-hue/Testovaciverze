import { defineConfig } from "tinacms";

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
            ui: {
              visualSelector: true,
            },
            templates: [
              // 1. HERO BLOK
              {
                name: "hero",
                label: "VELKÝ HERO",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `🚀 Hero: ${item.adminLabel}` : "🚀 VELKÝ HERO",
                  }),
                  defaultItem: { align: "center", fontSize: 60, fontWeight: "900", pt: 80, pb: 80 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "rich-text" as const, name: "heading", label: "Hlavní nadpis (Rich Text)" },
                  { type: "rich-text" as const, name: "subheading", label: "Podnadpis (Rich Text)" },
                  { type: "rich-text" as const, name: "body", label: "Obsah sekce (Rich Text)" },
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
              // 2. HEADING BLOK
              {
                name: "heading",
                label: "NADPIS (H2)",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `📝 Nadpis: ${item.adminLabel}` : "📝 NADPIS (H2)",
                  }),
                  defaultItem: { align: "left", fontSize: 36, fontWeight: "700", mb: 20 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "rich-text" as const, name: "text", label: "Text nadpisu (Rich Text)" },
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
              // 3. CONTENT BLOK
              {
                name: "content",
                label: "TEXTOVÝ OBSAH",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `📖 Text: ${item.adminLabel}` : "📖 TEXTOVÝ OBSAH (Rich Text)",
                  }),
                  defaultItem: { align: "left", fontSize: 18, fontWeight: "400", mb: 16 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "rich-text" as const, name: "body", label: "Obsah (Rich Text)" },
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
              // 4. CTA TLAČÍTKO - EDITOVÁNO: jednořádkový Rich Text, smazáno body
              {
                name: "cta",
                label: "TLAČÍTKO (CTA)",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `🔗 Tlačítko: ${item.adminLabel}` : "🔗 TLAČÍTKO (CTA)",
                  }),
                  defaultItem: { align: "center", fontSize: 16, fontWeight: "700", pt: 14, pb: 14, pl: 28, pr: 28, btnBgColor: "#2563eb", btnTextColor: "#ffffff" }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "rich-text" as const, name: "title", label: "Text tlačítka (Rich Text)", parser: { type: "markdown" } },
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
              // 5. NAVBAR - EDITOVÁNO: jednořádkový Rich Text u loga a odkazů, smazáno body
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `🧭 Menu: ${item.adminLabel}` : "🧭 NAVBAR (Menu)",
                  }),
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "rich-text" as const, name: "logoText", label: "Text loga (Rich Text)", parser: { type: "markdown" } },
                  { 
                    type: "object" as const, 
                    list: true, 
                    name: "links", 
                    label: "Odkazy v menu", 
                    fields: [
                      { type: "rich-text" as const, name: "label", label: "Název odkazu (Rich Text)", parser: { type: "markdown" } },
                      { type: "string" as const, name: "url", label: "Adresa" }
                    ]
                  }
                ]
              },
              // 6. OBRÁZEK
              {
                name: "image",
                label: "IMAGE (Obrázek)",
                ui: {
                  itemProps: (item: any) => ({
                    label: item?.adminLabel ? `🖼️ Obrázek: ${item.adminLabel}` : "🖼️ IMAGE (Obrázek)",
                  }),
                  defaultItem: { align: "center", borderRadius: 0, mt: 20, mb: 20 }
                },
                fields: [
                  { type: "string" as const, name: "adminLabel", label: "Interní název bloku (Pouze pro admina)" },
                  { type: "image" as const, name: "url", label: "Soubor obrázku" },
                  { type: "string" as const, name: "caption", label: "Popisek obrázku" },
                  { type: "rich-text" as const, name: "body", label: "Detailní text pod obrázkem (Rich Text)" },
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