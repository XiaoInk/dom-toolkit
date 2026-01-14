import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/interactor.js',
      name: 'domToolkitInteractor',
      fileName: 'interactor.min',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        dir: 'dist/modules',
        entryFileNames: 'interactor.min.iife.js'
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