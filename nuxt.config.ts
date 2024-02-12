import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  css: ['~/assets/css/styles.scss', '~/assets/css/variables.scss'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
