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
            //  src folder alias
            '@': path.resolve(__dirname,'./src'),
            '@app': path.resolve(__dirname,'./src/app'),
            '@api': path.resolve(__dirname,'./src/api'),
            '@assets': path.resolve(__dirname,'./src/assets'),
            '@components': path.resolve(__dirname,'./src/components'),
            '@context': path.resolve(__dirname,'./src/context'),
            // '@environment': path.resolve(__dirname,'./src/environments'),
            '@features': path.resolve(__dirname,'./src/features'),
            '@utils': path.resolve(__dirname,'./src/utils'),
        }
    }
});
