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
            // 固定のURLではなく、環境変数を見るように変更します
            host: process.env.GQL_HOST, 
            retainToken: true,
            // もしAPIキー（トークン）も環境変数にしているなら、ここに追加します
            token: {
              name: 'X-MICROCMS-API-KEY',
              value: process.env.MICROCMS_API_KEY,
              type: 'None'
            }
          }
        }
      }
    }
  }
})