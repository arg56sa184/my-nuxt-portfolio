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
            // https かつ 末尾スラッシュあり で固定
            host: 'https://arg56sa184.cloudfree.jp/blog/graphql/',
            retainToken: true
          }
        }
      }
    }
  }
})