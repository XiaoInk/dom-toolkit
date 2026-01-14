import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/coordinate.js',
      name: 'domToolkitCoordinates',
      fileName: 'coordinate.min',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        dir: 'dist/modules',
        entryFileNames: 'coordinate.min.iife.js'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});