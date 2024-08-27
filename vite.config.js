/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            //@ts-ignore
            components: path.resolve(__dirname, "./src/components"),
            // @ts-ignore
            config: path.resolve(__dirname, "./src/config"),
            // @ts-ignore
            assets: path.resolve(__dirname, "./src/assets"),
            // @ts-ignore
            hoc: path.resolve(__dirname, "./src/hoc"),
            // @ts-ignore
            hooks: path.resolve(__dirname, "./src/hooks"),
            // @ts-ignore
            interfaces: path.resolve(__dirname, "./src/interfaces"),
            // @ts-ignore
            lib: path.resolve(__dirname, "./src/lib"),
            // @ts-ignore
            store: path.resolve(__dirname, "./src/store"),
            // @ts-ignore
            utils: path.resolve(__dirname, "./src/utils"),
            // @ts-ignore
            routes: path.resolve(__dirname, "./src/routes"),
            // @ts-ignore
            layouts: path.resolve(__dirname, "./src/layouts"),
            // @ts-ignore
            pages: path.resolve(__dirname, "./src/pages"),
        },
    },
});
