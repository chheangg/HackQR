import { defineConfig } from 'vite';
import path from 'path';
import viteReact from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    viteReact(),
    TanStackRouterVite()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src') // Resolve alias to src folder
    }
  },
  server: {
    host: true
  }
});
