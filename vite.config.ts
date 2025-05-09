import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "vite-plugin-md",
      transform(code, id) {
        if (id.endsWith(".md") || id.endsWith(".mdx")) {
          return {
            code: `export default ${JSON.stringify(code)};`,
            map: null,
          };
        }
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url?.startsWith("/guides/") &&
            (req.url.endsWith(".md") || req.url.endsWith(".mdx"))
          ) {
            const filePath = path.join(__dirname, req.url);
            try {
              const content = fs.readFileSync(filePath, "utf-8");
              res.setHeader("Content-Type", "text/plain");
              res.end(content);
            } catch (error) {
              next(error);
            }
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    cors: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
  },
});
