import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5000,
        host: true,
    },
    build: {
        sourcemap: false,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'./src'),
            '@app': path.resolve(__dirname,'./src/app'),
            '@assets': path.resolve(__dirname,'./src/assets'),
            '@components': path.resolve(__dirname,'./src/components'),
            '@api': path.resolve(__dirname,'./src/api'),
            '@context': path.resolve(__dirname,'./src/context'),
            '@features': path.resolve(__dirname,'./src/features'),
            '@utils': path.resolve(__dirname,'./src/utils'),
        }
    }
});
