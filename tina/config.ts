import { defineConfig } from "tinacms";
import { TipTapEditor } from "./TipTapEditor";
import { PositionPicker } from "./PositionPicker";

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Stránky",
        path: "content/pages",
        format: "mdx",
        // 🚀 TOTO ZAPNE VIZUÁLNÍ LIVE EDITING NA ROZDĚLENÉ OBRAZOVCE!
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sekce stránky",
            ui: {
              itemProps: (item: any) => {
                return { label: item?.internalName || "TEXTOVÝ OBSAH" };
              },
            } as any,
            templates: [
              {
                name: "textContent",
                label: "TEXTOVÝ OBSAH",
                fields: [
                  {
                    type: "string",
                    name: "internalName",
                    label: "Interní název bloku",
                  },
                  {
                    type: "string",
                    name: "body",
                    label: "Obsah",
                    ui: {
                      component: TipTapEditor,
                      toolbar: ["heading", "bold", "italic", "quote", "bulletList", "textColor", "highlight"]
                    } as any
                  },
                  {
                    type: "object",
                    name: "padding",
                    label: "Vnitřní odsazení (padding - px)",
                    ui: {
                      component: PositionPicker
                    },
                    fields: [
                      { type: "string", name: "top" },
                      { type: "string", name: "right" },
                      { type: "string", name: "bottom" },
                      { type: "string", name: "left" },
                    ]
                  },
                  {
                    type: "object",
                    name: "margin",
                    label: "Vnější odsazení (margin - px)",
                    ui: {
                      component: PositionPicker
                    },
                    fields: [
                      { type: "string", name: "top" },
                      { type: "string", name: "right" },
                      { type: "string", name: "bottom" },
                      { type: "string", name: "left" },
                    ]
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});