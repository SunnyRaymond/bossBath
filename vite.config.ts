import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    host: true, // listen on 0.0.0.0
    allowedHosts: ["41038b18cfdb.ngrok-free.app"], // allow access via ngrok
  },
});
