// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: cloudflare(),
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