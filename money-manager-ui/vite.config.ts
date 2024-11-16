import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import manifest from "./src/ui/manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: ["@electric-sql/pglite"],
    },
    worker: {
        format: "es",
    },
    mode: "development",
    server: {
        port: 3000,
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },
    plugins: [
        react(),
        VitePWA({
            injectRegister: false,
            injectManifest: {
                maximumFileSizeToCacheInBytes: 13_000_000,
            },
            srcDir: "src/service-worker",
            filename: "common.worker.ts",
            // @ts-ignore
            manifest,
            strategies: "injectManifest",
        }),
    ],
});
