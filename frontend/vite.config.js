import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/web/',
  root: '.',
  build: {
    outDir: '../public/web',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(process.cwd(), 'index.html')
    }
  }
});
