import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/detector.js',
      name: 'domToolkitDetector',
      fileName: 'detector.min',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        dir: 'dist/modules',
        entryFileNames: 'detector.min.iife.js'
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