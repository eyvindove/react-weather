import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@public",
        replacement: fileURLToPath(new URL("./public", import.meta.url)),
      },
    ],
  },
});
