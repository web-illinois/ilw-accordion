import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        lib: {
            name: "ilw-accordion",
            entry: "ilw-accordion.js",
            fileName: "ilw-accordion",
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") return "ilw-accordion.css";
                },
            },
        },
    },
    server: {
        hmr: false,
    },
});
