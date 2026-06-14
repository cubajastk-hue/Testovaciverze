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
          { type: "string", name: "adminLabel", label: "Interní název (pro admin)", isTitle: true, required: true },
          { type: "string", name: "outerBgColor", label: "Barva pozadí celé stránky", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Pohyblivé bloky stránky",
            ui: {
              visualSelector: true,
              itemProps: (item) => {
                const labels: any = {
                  navbar: "Menu",
                  hero: "Velký Hero",
                  heading: "Nadpis",
                  content: "Text",
                  image: "Obrázek",
                  cta: "Tlačítko"
                };
                return { label: `${labels[item.__typename] || item.__typename}: ${item.heading || item.text || item.logoText || ""}` };
              },
            },
            templates: [
              ...["hero", "heading", "content", "cta"].map((blockName) => ({
                name: blockName,
                label: blockName.toUpperCase(),
                fields: [
                  ...(blockName === "hero" ? [
                    { type: "string", name: "heading", label: "Hlavní nadpis", description: "Největší text na začátku sekce" },
                    { type: "string", name: "subheading", label: "Podnadpis", description: "Menší doplňující text pod hlavním nadpisem" }
                  ] : []),
                  ...(blockName === "heading" ? [{ type: "string", name: "text", label: "Text nadpisu", description: "Klasický nadpis druhé úrovně (H2) pro oddělení sekcí" }] : []),
                  ...(blockName === "content" ? [{ type: "rich-text", name: "body", label: "Obsah", description: "Hlavní textový blok. Můžeš zde psát odstavce, seznamy nebo tučný text" }] : []),
                  ...(blockName === "cta" ? [
                    { type: "string", name: "title", label: "Text tlačítka", description: "Text, který se napíše přímo dovnitř tlačítka" }, 
                    { type: "string", name: "link", label: "Odkaz", description: "Kam tlačítko lidi pošle (např. /kontakt nebo https://google.com)" }
                  ] : []),
                  
                  // DESIGN SEKCE S POZNÁMKAMI
                  { 
                    type: "string", 
                    name: "align", 
                    label: "Zarovnání obsahu a textu", 
                    description: "Vyber rychlé zarovnání, nebo zvol 'Vlastní', pokud chceš odemknout posun do stran pomocí pixelů (Margin Left/Right)",
                    options: [
                      { value: "left", label: "Vlevo" },
                      { value: "center", label: "Střed" },
                      { value: "right", label: "Vpravo" },
                      { value: "custom", label: "Vlastní (odemkne všechny pixely)" }
                    ]
                  },
                  { type: "string", name: "textColor", label: "Barva textu", description: "Kliknutím vyber barvu písma pro tento blok", ui: { component: "color" } },
                  { type: "number", name: "fontSize", label: "Velikost písma (px)", description: "Zadej číslo v pixelech pro zvětšení/zmenšení textu" },
                  { type: "string", name: "fontWeight", label: "Tloušťka písma", description: "Jak moc bude text tučný", options: [{value:"400",label:"Normální"},{value:"700",label:"Tučné"},{value:"900",label:"Extra tučné"}]},
                  
                  // PADDING (Vnitřní prostor boxu)
                  { type: "number", name: "pt", label: "Vnitřní horní prostor (Padding Top)", description: "Nafoukne vnitřek boxu směrem nahoru (přidá barvu pozadí nad text)" },
                  { type: "number", name: "pb", label: "Vnitřní dolní prostor (Padding Bottom)", description: "Nafoukne vnitřek boxu směrem dolů (přidá barvu pozadí pod text)" },
                  { type: "number", name: "pl", label: "Vnitřní levý prostor (Padding Left)", description: "Nafoukne prostor uvnitř boxu zleva" },
                  { type: "number", name: "pr", label: "Vnitřní pravý prostor (Padding Right)", description: "Nafoukne prostor uvnitř boxu zprava" },
                  
                  // MARGIN (Posun boxu)
                  { type: "number", name: "mt", label: "Vnější horní odsazení (Margin Top)", description: "Odtlačí celý tento blok od bloku nad ním (vytvoří mezeru)" },
                  { type: "number", name: "mb", label: "Vnější dolní odsazení (Margin Bottom)", description: "Odtlačí celý tento blok od bloku pod ním" },
                  { type: "number", name: "ml", label: "Vnější levé odsazení (Margin Left)", description: "Funguje pouze při zarovnání 'Vlastní'. Posune celý blok od levého okraje obrazovky" },
                  { type: "number", name: "mr", label: "Vnější pravé odsazení (Margin Right)", description: "Funguje pouze při zarovnání 'Vlastní'. Posune celý blok od pravého okraje obrazovky" },

                  ...(blockName === "cta" ? [
                    { type: "string", name: "btnBgColor", label: "Barva pozadí tlačítka", description: "Vyber barvu samotného klikatelného tlačítka", ui: { component: "color" } },
                    { type: "string", name: "btnTextColor", label: "Barva textu uvnitř tlačítka", description: "Vyber barvu textu, aby byl na tlačítku dobře vidět", ui: { component: "color" } }
                  ] : []),
                ]
              })),
              {
                name: "navbar",
                label: "NAVBAR (Menu)",
                fields: [
                  { type: "string", name: "logoText", label: "Text loga", description: "Název tvého webu v levém rohu menu" },
                  { type: "object", list: true, name: "links", label: "Odkazy v menu", description: "Seznam stránek, na které se dá z menu kliknout", fields: [{type:"string",name:"label",label:"Název odkazu"},{type:"string",name:"url",label:"Adresa (kam vede)"}]}
                ]
              },
              {
                name: "image",
                label: "IMAGE (Obrázek)",
                fields: [
                  { type: "image", name: "url", label: "Soubor obrázku", description: "Nahraj obrázek z počítače nebo vyber stávající" },
                  { type: "string", name: "caption", label: "Popisek obrázku", description: "Malý text, který se zobrazí přímo pod fotkou" },
                  { type: "string", name: "align", label: "Zarovnání obrázku", description: "Zarovná obrázek na střed, vlevo nebo vpravo", options: [{value:"left",label:"Vlevo"},{value:"center",label:"Střed"},{value:"right",label:"Vpravo"},{value:"custom",label:"Vlastní"}]},
                  { type: "number", name: "mt", label: "Horní odsazení (Margin Top)", description: "Mezera nad obrázkem v px" },
                  { type: "number", name: "mb", label: "Dolní odsazení (Margin Bottom)", description: "Mezera pod obrázkem v px" },
                  { type: "number", name: "pl", label: "Levé odsazení obrázku v px" },
                  { type: "number", name: "pr", label: "Pravé odsazení obrázku v px" },
                  { type: "number", name: "borderRadius", label: "Zaoblení rohů (px)", description: "Čím větší číslo, tím kulatější rohy obrázek bude mít" }
                ]
              }
            ],
          },
        ],
      },
    ],
  },
});