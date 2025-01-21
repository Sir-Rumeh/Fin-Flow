
// /* eslint-disable @typescript-eslint/ban-ts-comment */

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// //@ts-ignore
// import path from "path";

// console.log("process.env.VITE_REACT_APP_CLIENT_URL", process.env.VITE_REACT_APP_CLIENT_URL)
// export default defineConfig({
// 	plugins: [react(), 
// 		{
// 			name: 'validate-imports',
// 			enforce: 'pre',
// 			resolveId(source) {
// 			if (source.includes('?import&raw') && source.startsWith('/restricted-folder')) {
// 				throw new Error('Access to restricted files via ?import&raw is not allowed.');
// 			}
// 			},
// 		},
// 	],
// 	server: {
// 		host: true,
// 		port: 3000, 
// 		fs: {
// 			deny: ['restricted-folder', '/absolute/path/to/deny'],
// 		},
// 		origin: process.env.VITE_REACT_APP_CLIENT_URL,
		
// 	},
// 	resolve: {
// 		alias: {
// 			//@ts-ignore
// 			components: path.resolve(__dirname, "./src/components") as string,
// 			// @ts-ignore
// 			config: path.resolve(__dirname, "./src/config") as string,
// 			// @ts-ignore
// 			assets: path.resolve(__dirname, "./src/assets") as string,
// 			// @ts-ignore
// 			hoc: path.resolve(__dirname, "./src/hoc") as string,
// 			// @ts-ignore
// 			hooks: path.resolve(__dirname, "./src/hooks") as string,
// 			// @ts-ignore
// 			interfaces: path.resolve(__dirname, "./src/interfaces") as string,
// 			// @ts-ignore
// 			lib: path.resolve(__dirname, "./src/lib") as string,
// 			// @ts-ignore
// 			store: path.resolve(__dirname, "./src/store") as string,
// 			// @ts-ignore
// 			utils: path.resolve(__dirname, "./src/utils") as string,
// 			// @ts-ignore
// 			routes: path.resolve(__dirname, "./src/routes") as string,
// 			// @ts-ignore
// 			layouts: path.resolve(__dirname, "./src/layouts") as string,
// 			// @ts-ignore
// 			pages: path.resolve(__dirname, "./src/pages") as string,
// 		},
// 	},
// });






/* eslint-disable @typescript-eslint/ban-ts-comment */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
   plugins: [
      react(),
      {
      name: "validate-imports",
      enforce: "pre",
      resolveId(source) {
         if (
            source.includes("?import&raw") &&
            source.startsWith("/restricted-folder")
         ) {
            throw new Error(
            "Access to restricted files via ?import&raw is not allowed."
            );
         }
      },
      },
   ],
	define: {
      // Expose environment variables to the app
      "process.env": {
			VITE_REACT_APP_CLIENT_URL: env.VITE_REACT_APP_CLIENT_URL,
      },
   },
   server: {
      host: true,
      port:  3000, 
      fs: {
      deny: ["restricted-folder", "/absolute/path/to/deny"],
      },
		origin: env.VITE_REACT_APP_CLIENT_URL,
   },
   resolve: {
      alias: {
      components: path.resolve(__dirname, "./src/components"),
      config: path.resolve(__dirname, "./src/config"),
      assets: path.resolve(__dirname, "./src/assets"),
      hoc: path.resolve(__dirname, "./src/hoc"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      interfaces: path.resolve(__dirname, "./src/interfaces"),
      lib: path.resolve(__dirname, "./src/lib"),
      store: path.resolve(__dirname, "./src/store"),
      utils: path.resolve(__dirname, "./src/utils"),
      routes: path.resolve(__dirname, "./src/routes"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      pages: path.resolve(__dirname, "./src/pages"),
      },
   },
};
});

