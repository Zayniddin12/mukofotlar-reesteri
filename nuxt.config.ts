// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'uzc',
      },
      title:
        'Узбекистон Республикасида унвон ва мукофотларга сазовор бўлганлар рўйхати',
      description:
        'Мустақиллик йилларидан бошлаб жорий этилган барча унвон ва мукофотлар рўйхати ташқилаштирилган платформа.',

      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://mukofotlar.reestri.com' },
      ],
      meta: [
        {
          property: 'og:title',
          content:
            "O'zbekiston Respublikasi unvon va mukofotlarga sazovor bo'lganlar ro'yxati",
        },
        {
          name: 'description',
          content:
            "Mustaqillik yillaridan boshlab joriy etilgan barcha unvon va mukofotlar ro'yxati tashkil etilgan platforma.",
        },
        {
          property: 'og:description',
          content:
            "Mustaqillik yillaridan boshlab joriy etilgan barcha unvon va mukofotlar ro'yxati tashkil etilgan platforma.",
        },
        {
          property: 'og:image',
          content: '/OgImage.svg',
        },
        { property: 'og:url', content: 'https://mukofotlar.reestri.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content:
            "O'zbekiston Respublikasi unvon va mukofotlarga sazovor bo'lganlar ro'yxati",
        },
        {
          name: 'twitter:description',
          content:
            "Mustaqillik yillaridan boshlab joriy etilgan barcha unvon va mukofotlar ro'yxati tashkil etilgan platforma.",
        },
        {
          name: 'twitter:image',
          content: 'https://mukofotlar.reestri.com/path/to/image.jpg',
        },
      ],
    },
  },

  css: ['~/assets/tailwind.css', '~/assets/icomoon/style.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag',
    '@nuxtjs/i18n',
    //   Enable if your Yandex Metrica with real credentials
    // [
    //   'yandex-metrika-module-nuxt3',
    //   {
    //     id: 0000000,
    //     webvisor: true,
    //   },
    // ],
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
      'nuxt-simple-robots',
      'nuxt-simple-sitemap',
    ],
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en', file: 'en' },
      { code: 'ar', iso: 'ar', file: 'ar' },
      { code: 'de', iso: 'de', file: 'de' },
      { code: 'es', iso: 'es', file: 'es' },
      { code: 'fr', iso: 'fr', file: 'fr' },
      { code: 'kaa', iso: 'kaa', file: 'kaa' },
      { code: 'uz', iso: 'uz', file: 'uz' },
      { code: 'uzc', iso: 'uzc', file: 'uzc' },
    ],
    lazy: true,
    useCookie: true,
    cookieKey: 'locale',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      onlyOnRoot: true, // recommended
      fallbackLocale: 'uzc',
    },
    defaultLocale: 'uzc',
    strategy: 'prefix_and_default',
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },

  gtag: {
    id: process.env.GOOGLE_TAG_ID,
  },

  compatibilityDate: '2024-12-12',
})
