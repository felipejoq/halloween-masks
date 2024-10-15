// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: cloudflare(),
  devToolbar: {
    enabled: false
  },
  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [{protocol: "https"}]
  },
  // experimental: {
  //   env: {
  //     schema: {
  //       BASE_URL: envField.string({
  //         context: 'server',
  //         access: 'secret',
  //         default: 'https://back.halloween.uncodigo.com',
  //       }),
  //       TOKEN_SECRET: envField.string({
  //         context: 'server',
  //         access: 'secret',
  //       }),
  //     }
  //   }
  // }
});