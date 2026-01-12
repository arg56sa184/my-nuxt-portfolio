export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss'],
  /*runtimeConfig: {
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
  }*/
 runtimeConfig: {
    public: {
      // Vercelの管理画面に登録する「GQL_HOST」をここに紐付ける
      gqlHost: process.env.GQL_HOST || 'https://arg56sa184.cloudfree.jp/blog/graphql/'
    }
  }
})