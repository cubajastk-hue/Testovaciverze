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
            // 🚀 FIX: Zde jsme ui odstranili, protože u bloků patří až do templates!
            templates: [
              {
                name: "textContent",
                label: "TEXTOVÝ OBSAH",
                ui: {
                  // 🚀 FIX: Správné místo pro itemProps je tady uvnitř šablony.
                  itemProps: (item) => {
                    return { label: item?.internalName || "TEXTOVÝ OBSAH" };
                  },
                },
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
                      component: TipTapEditor
                    } as any
                  },
                  {
                    type: "object",
                    name: "padding",
                    label: "Vnitřní odsazení (padding - px)",
                    ui: { component: PositionPicker },
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
                    ui: { component: PositionPicker },
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