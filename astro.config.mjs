// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: netlify(),
  devToolbar: {
    enabled: false
  },
  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [{protocol: "https"}]
  },
  experimental: {
    env: {
      schema: {
        BASE_URL: envField.string({
          context: 'server',
          access: 'secret',
          default: 'https://back.halloween.uncodigo.com',
        }),
        TOKEN_SECRET: envField.string({
          context: 'server',
          access: 'secret',
        }),
      }
    }
  }
});