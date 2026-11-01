import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

const isBuild = process.argv.includes('build') || process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://dina-yazdani97.github.io',
  output: isBuild ? 'static' : 'server',
  adapter: isBuild ? undefined : node({ mode: 'standalone' }),
  integrations: [react(), ...(isBuild ? [] : [keystatic()])],
  vite: {
    plugins: [tailwindcss()],
  },
});
