<script setup>
const config = useRuntimeConfig()
const url = config.public.gqlHost || 'https://arg56sa184.cloudfree.jp/blog/graphql/'

const query = `
  query getPosts {
    posts {
      nodes {
        databaseId
        title
        date
        excerpt
      }
    }
  }
`

// データの受け取り方を、画面に出ているJSONの階層にピッタリ合わせます
const { data, error } = await useAsyncData('posts', async () => {
  const response = await $fetch(url, {
    method: 'POST',
    body: { query }
  })
  // あなたの画面に出ている通り、response の中にさらに .data がある構造に対応
  return response.data
}, { server: false })

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">My Blog Portfolio</h1>
        <p class="text-gray-600">WordPress の記事を Nuxt で表示中</p>
      </header>

      <div v-if="data?.posts?.nodes" class="grid gap-8 md:grid-cols-2">
        <div 
          v-for="post in data.posts.nodes" 
          :key="post.databaseId"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 p-6"
        >
          <span class="text-sm text-emerald-600 font-semibold">
            {{ formatDate(post.date) }}
          </span>
          <h2 class="text-xl font-bold text-gray-800 mt-2 mb-3">
            {{ post.title }}
          </h2>
          <div class="text-gray-600 text-sm mb-4 line-clamp-3" v-html="post.excerpt"></div>
          
          <NuxtLink 
            :to="`/post/${post.databaseId}`"
            class="inline-block text-emerald-500 font-medium hover:text-emerald-700 transition-colors"
          >
            続きを読む →
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="!error" class="text-center py-20 text-gray-500">
        記事を読み込んでいます...
      </div>

      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
        通信エラーが発生しました: {{ error.message }}
      </div>
    </div>
  </div>
</template>