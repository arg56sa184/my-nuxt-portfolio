export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            // ここに直接、判明した本物のURLを書き込みます
            host: 'https://arg56sa184.cloudfree.jp/blog/graphql',
            retainToken: true
          }
        }
      }
    }
  }
})