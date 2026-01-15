import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/coordinate.js',
      name: 'domToolkitCoordinates',
      fileName: () => 'coordinate.min.iife.js',
      formats: ['iife']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        dir: 'dist/modules',
        entryFileNames: 'coordinate.min.iife.js'
      }
    },
    emptyOutDir: false
  }
});