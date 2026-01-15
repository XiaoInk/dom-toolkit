import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/detector.js',
      name: 'domToolkitDetector',
      fileName: () => 'detector.min.iife.js',
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
        entryFileNames: 'detector.min.iife.js'
      }
    },
    emptyOutDir: false
  }
});