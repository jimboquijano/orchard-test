import { defineConfig } from 'vite'

export default defineConfig({
  base: '/orchard-test/',
  build: {
    outDir: 'dist' // must match workflow
  }
})
