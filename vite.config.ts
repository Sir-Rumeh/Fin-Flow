/* eslint-disable @typescript-eslint/ban-ts-comment */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from "path";

export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 3000, 
	},
	resolve: {
		alias: {
			//@ts-ignore
			components: path.resolve(__dirname, "./src/components") as string,
			// @ts-ignore
			config: path.resolve(__dirname, "./src/config") as string,
			// @ts-ignore
			assets: path.resolve(__dirname, "./src/assets") as string,
			// @ts-ignore
			hoc: path.resolve(__dirname, "./src/hoc") as string,
			// @ts-ignore
			hooks: path.resolve(__dirname, "./src/hooks") as string,
			// @ts-ignore
			interfaces: path.resolve(__dirname, "./src/interfaces") as string,
			// @ts-ignore
			lib: path.resolve(__dirname, "./src/lib") as string,
			// @ts-ignore
			store: path.resolve(__dirname, "./src/store") as string,
			// @ts-ignore
			utils: path.resolve(__dirname, "./src/utils") as string,
			// @ts-ignore
			routes: path.resolve(__dirname, "./src/routes") as string,
			// @ts-ignore
			layouts: path.resolve(__dirname, "./src/layouts") as string,
			// @ts-ignore
			pages: path.resolve(__dirname, "./src/pages") as string,
		},
	},
});
