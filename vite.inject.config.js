import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'domToolkit',
      fileName: (format) => `dom-toolkit.inject.min.js`,
      formats: ['iife']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        passes: 3
      },
      mangle: {
        toplevel: true
      }
    },
    rollupOptions: {
      output: {
        dir: 'dist'
      }
    }
  }
});