<script setup>
const url = 'http://arg56sa184.cloudfree.jp/blog/graphql'
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
const { data, error } = await useAsyncData('posts', () => 
  $fetch(url, {
    method: 'POST',
    body: { query }
  }), { server: false }
)

// 日付を読みやすくする関数
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">My Blog Portfolio</h1>
        <p class="text-gray-600">Nuxt 4 × Headless WordPress で構築した最新サイト</p>
      </header>

      <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
        通信エラーが発生しました。
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2">
        <div 
          v-for="post in data?.data?.posts?.nodes" 
          :key="post.databaseId"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
        >
          <div class="p-6">
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
      </div>
    </div>
  </div>
</template>