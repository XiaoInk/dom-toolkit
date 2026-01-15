import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/interactor.js',
      name: 'domToolkitInteractor',
      fileName: () => 'interactor.min.iife.js',
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
        entryFileNames: 'interactor.min.iife.js'
      }
    },
    emptyOutDir: false
  }
});