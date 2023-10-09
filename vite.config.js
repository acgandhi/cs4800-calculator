import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [solid(),tailwindcss()],
})
