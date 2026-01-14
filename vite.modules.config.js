import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        coordinate: 'src/coordinate.js',
        detector: 'src/detector.js',
        interactor: 'src/interactor.js',
        scroller: 'src/scroller.js'
      },
      formats: ['es']
    },
    rollupOptions: {
      output: {
        dir: 'dist/modules',
        entryFileNames: '[name].min.js'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: true
    }
  }
});