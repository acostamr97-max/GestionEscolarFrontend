import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Configuracion de Vite (la herramienta que levanta y compila el proyecto).
   - react(): habilita React (JSX, etc.).
   - tailwindcss(): habilita Tailwind v4 directamente desde Vite,
     sin necesidad de tailwind.config.js ni postcss.config.js. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
