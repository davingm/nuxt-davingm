import { defineConfig } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default defineConfig({
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [forms]
})
