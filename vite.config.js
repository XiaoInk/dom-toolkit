import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'domToolkit',
      fileName: 'dom-toolkit',
      formats: ['iife']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      mangle: true
    },
    rollupOptions: {
      output: {
        dir: 'dist'
      }
    }
  }
});