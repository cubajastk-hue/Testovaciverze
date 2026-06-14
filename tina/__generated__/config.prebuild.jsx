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
              visualSelector: true,
              itemProps: (item) => {
                const labels = {
                  navbar: "Menu",
                  hero: "Velk\xFD Hero",
                  heading: "Nadpis",
                  content: "Text",
                  image: "Obr\xE1zek",
                  cta: "Tla\u010D\xEDtko"
                };
                return { label: `${labels[item.__typename] || item.__typename}: ${item.heading || item.text || item.logoText || ""}` };
              }
            },
            templates: [
              ...["hero", "heading", "content", "cta"].map((blockName) => ({
                name: blockName,
                label: blockName.toUpperCase(),
                fields: [
                  ...blockName === "hero" ? [
                    { type: "string", name: "heading", label: "Hlavn\xED nadpis", description: "Nejv\u011Bt\u0161\xED text na za\u010D\xE1tku sekce" },
                    { type: "string", name: "subheading", label: "Podnadpis", description: "Men\u0161\xED dopl\u0148uj\xEDc\xED text pod hlavn\xEDm nadpisem" }
                  ] : [],
                  ...blockName === "heading" ? [{ type: "string", name: "text", label: "Text nadpisu", description: "Klasick\xFD nadpis druh\xE9 \xFArovn\u011B (H2) pro odd\u011Blen\xED sekc\xED" }] : [],
                  ...blockName === "content" ? [{ type: "rich-text", name: "body", label: "Obsah", description: "Hlavn\xED textov\xFD blok. M\u016F\u017Ee\u0161 zde ps\xE1t odstavce, seznamy nebo tu\u010Dn\xFD text" }] : [],
                  ...blockName === "cta" ? [
                    { type: "string", name: "title", label: "Text tla\u010D\xEDtka", description: "Text, kter\xFD se nap\xED\u0161e p\u0159\xEDmo dovnit\u0159 tla\u010D\xEDtka" },
                    { type: "string", name: "link", label: "Odkaz", description: "Kam tla\u010D\xEDtko lidi po\u0161le (nap\u0159. /kontakt nebo https://google.com)" }
                  ] : [],
                  // DESIGN SEKCE S POZNÁMKAMI
                  {
                    type: "string",
                    name: "align",
                    label: "Zarovn\xE1n\xED obsahu a textu",
                    description: "Vyber rychl\xE9 zarovn\xE1n\xED, nebo zvol 'Vlastn\xED', pokud chce\u0161 odemknout posun do stran pomoc\xED pixel\u016F (Margin Left/Right)",
                    options: [
                      { value: "left", label: "Vlevo" },
                      { value: "center", label: "St\u0159ed" },
                      { value: "right", label: "Vpravo" },
                      { value: "custom", label: "Vlastn\xED (odemkne v\u0161echny pixely)" }
                    ]
                  },
                  { type: "string", name: "textColor", label: "Barva textu", description: "Kliknut\xEDm vyber barvu p\xEDsma pro tento blok", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost p\xEDsma (px)", description: "Zadej \u010D\xEDslo v pixelech pro zv\u011Bt\u0161en\xED/zmen\u0161en\xED textu" },
                  { type: "string", name: "fontWeight", label: "Tlou\u0161\u0165ka p\xEDsma", description: "Jak moc bude text tu\u010Dn\xFD", options: [{ value: "400", label: "Norm\xE1ln\xED" }, { value: "700", label: "Tu\u010Dn\xE9" }, { value: "900", label: "Extra tu\u010Dn\xE9" }] },
                  // PADDING (Vnitřní prostor boxu)
                  { type: "number", name: "pt", label: "Vnit\u0159n\xED horn\xED prostor (Padding Top)", description: "Nafoukne vnit\u0159ek boxu sm\u011Brem nahoru (p\u0159id\xE1 barvu pozad\xED nad text)" },
                  { type: "number", name: "pb", label: "Vnit\u0159n\xED doln\xED prostor (Padding Bottom)", description: "Nafoukne vnit\u0159ek boxu sm\u011Brem dol\u016F (p\u0159id\xE1 barvu pozad\xED pod text)" },
                  { type: "number", name: "pl", label: "Vnit\u0159n\xED lev\xFD prostor (Padding Left)", description: "Nafoukne prostor uvnit\u0159 boxu zleva" },
                  { type: "number", name: "pr", label: "Vnit\u0159n\xED prav\xFD prostor (Padding Right)", description: "Nafoukne prostor uvnit\u0159 boxu zprava" },
                  // MARGIN (Posun boxu)
                  { type: "number", name: "mt", label: "Vn\u011Bj\u0161\xED horn\xED odsazen\xED (Margin Top)", description: "Odtla\u010D\xED cel\xFD tento blok od bloku nad n\xEDm (vytvo\u0159\xED mezeru)" },
                  { type: "number", name: "mb", label: "Vn\u011Bj\u0161\xED doln\xED odsazen\xED (Margin Bottom)", description: "Odtla\u010D\xED cel\xFD tento blok od bloku pod n\xEDm" },
                  { type: "number", name: "ml", label: "Vn\u011Bj\u0161\xED lev\xE9 odsazen\xED (Margin Left)", description: "Funguje pouze p\u0159i zarovn\xE1n\xED 'Vlastn\xED'. Posune cel\xFD blok od lev\xE9ho okraje obrazovky" },
                  { type: "number", name: "mr", label: "Vn\u011Bj\u0161\xED prav\xE9 odsazen\xED (Margin Right)", description: "Funguje pouze p\u0159i zarovn\xE1n\xED 'Vlastn\xED'. Posune cel\xFD blok od prav\xE9ho okraje obrazovky" },
                  ...blockName === "cta" ? [
                    { type: "string", name: "btnBgColor", label: "Barva pozad\xED tla\u010D\xEDtka", description: "Vyber barvu samotn\xE9ho klikateln\xE9ho tla\u010D\xEDtka", ui: { component: "color" } },
                    { type: "string", name: "btnTextColor", label: "Barva textu uvnit\u0159 tla\u010D\xEDtka", description: "Vyber barvu textu, aby byl na tla\u010D\xEDtku dob\u0159e vid\u011Bt", ui: { component: "color" } }
                  ] : []
                ]
              })),
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "logoText", label: "Text loga", description: "N\xE1zev tv\xE9ho webu v lev\xE9m rohu menu" },
                  { type: "object", list: true, name: "links", label: "Odkazy v menu", description: "Seznam str\xE1nek, na kter\xE9 se d\xE1 z menu kliknout", fields: [{ type: "string", name: "label", label: "N\xE1zev odkazu" }, { type: "string", name: "url", label: "Adresa (kam vede)" }] }
                ]
              },
              {
                name: "image",
                label: "IMAGE (Obr\xE1zek)",
                fields: [
                  { type: "image", name: "url", label: "Soubor obr\xE1zku", description: "Nahraj obr\xE1zek z po\u010D\xEDta\u010De nebo vyber st\xE1vaj\xEDc\xED" },
                  { type: "string", name: "caption", label: "Popisek obr\xE1zku", description: "Mal\xFD text, kter\xFD se zobraz\xED p\u0159\xEDmo pod fotkou" },
                  { type: "string", name: "align", label: "Zarovn\xE1n\xED obr\xE1zku", description: "Zarovn\xE1 obr\xE1zek na st\u0159ed, vlevo nebo vpravo", options: [{ value: "left", label: "Vlevo" }, { value: "center", label: "St\u0159ed" }, { value: "right", label: "Vpravo" }, { value: "custom", label: "Vlastn\xED" }] },
                  { type: "number", name: "mt", label: "Horn\xED odsazen\xED (Margin Top)", description: "Mezera nad obr\xE1zkem v px" },
                  { type: "number", name: "mb", label: "Doln\xED odsazen\xED (Margin Bottom)", description: "Mezera pod obr\xE1zkem v px" },
                  { type: "number", name: "pl", label: "Lev\xE9 odsazen\xED obr\xE1zku v px" },
                  { type: "number", name: "pr", label: "Prav\xE9 odsazen\xED obr\xE1zku v px" },
                  { type: "number", name: "borderRadius", label: "Zaoblen\xED roh\u016F (px)", description: "\u010C\xEDm v\u011Bt\u0161\xED \u010D\xEDslo, t\xEDm kulat\u011Bj\u0161\xED rohy obr\xE1zek bude m\xEDt" }
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
