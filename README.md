# Framer-Style Custom Editor for TinaCMS

This repo contains a couple of custom UI components for **TinaCMS** that replace the default rich text editor and margin/padding inputs. The design is heavily inspired by Framer's clean, minimalist "pill-shaped" aesthetic.

## What's inside

* **Floating "Pill" Menu:** Instead of a clunky full-width toolbar, the editor menu floats elegantly above the text area.
* **Smart Color Pickers:** We hid the ugly native OS color palettes. Now you just get a clean "A" (for text) and a "✏️" (for highlights) that dynamically change their background to match your selected color.
* **Pixel-Perfect Alignment:** All borders, fonts, and shadows (6px radius) perfectly match the native TinaCMS UI, so it feels like a seamless part of the CMS.
* **Cleaner Position Picker:** Replaced the massive default margin/padding grids with a sleek, compact, and centered input layout.

## Dependencies

You'll need TipTap and a few of its extensions for the editor to work. Just run:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-text-style @tiptap/extension-color @tiptap/extension-highlight
