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
            // あなたのサイトのURLに合わせてください
            host: 'https://plus9.local/graphql',
            retainToken: true
          }
        }
      }
    }
  }
})