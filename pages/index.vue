<script setup>
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

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
  })
)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">My Blog Portfolio</h1>
        <p class="text-gray-600 font-medium">✨ WordPress 連携成功！ ✨</p>
      </header>

      <div v-if="data?.data?.posts?.nodes" class="grid gap-6 md:grid-cols-2">
        <div 
          v-for="post in data.data.posts.nodes" 
          :key="post.databaseId"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div class="text-sm text-emerald-600 font-bold mb-2">
            {{ formatDate(post.date) }}
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-3">
            {{ post.title }}
          </h2>
          <div class="text-gray-600 text-sm mb-4" v-html="post.excerpt"></div>
          
          <NuxtLink 
  :to="`/post/${post.databaseId}`" 
  class="inline-block text-emerald-500 font-medium hover:text-emerald-700 transition-colors"
>
  続きを読む →
</NuxtLink>
        </div>
      </div>

      <div v-else class="text-center py-20 text-gray-400">
        読み込み中...
      </div>
    </div>
  </div>
</template>