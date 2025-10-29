import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/orchard-test/',
  build: {
    lib: {
      entry: resolve(__dirname, './src/main.js'),
      name: 'main',
      fileName: (format) => `main.${format}.js`
    }
  }
})
