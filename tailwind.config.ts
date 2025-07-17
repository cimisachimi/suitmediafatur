// tailwind.config.ts
import type { Config } from "tailwindcss";
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definisikan warna utama Anda di sini
        'primary': '#ff6600', 
      },
    },
  },
  plugins: [
    lineClamp, // Tambahkan baris ini
  ],
};
export default config;