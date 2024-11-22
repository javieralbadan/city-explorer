import { defineNuxtConfig } from 'nuxt/config';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      openWeatherMapApiKey: process.env.OPENWEATHERMAP_API_KEY,
      mapboxApiKey: process.env.MAPBOX_API_KEY,
      unsplashApiKey: process.env.UNSPLASH_API_KEY,
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'City Explorer App - Discover Cities',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Explore cities with real-time weather updates, interactive maps, and beautiful images.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'keywords',
          content: 'city explorer, weather updates, city maps, beautiful images, travel tool',
        },
        { name: 'author', content: 'Javier Albadan Romero' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/reset.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/tailwindcss'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['ant-design-vue'],
  },

  vite: {
    plugins: [Components({ resolvers: [AntDesignVueResolver()] })],
    ssr: { noExternal: ['ant-design-vue'] },
  },

  devtools: { enabled: true },

  compatibilityDate: '2024-11-21',
});
