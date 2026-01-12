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

// $fetchの結果を直接 .data で受け取るように調整
const { data: result, error } = await useAsyncData('posts', async () => {
  const response = await $fetch(url, {
    method: 'POST',
    body: { query }
  })
  // response.data の中に WordPress の posts が入っている
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
        <p class="text-gray-600">通信成功！おめでとうございます！</p>
      </header>

      <div v-if="result?.posts?.nodes" class="grid gap-8 md:grid-cols-2">
        <div 
          v-for="post in result.posts.nodes" 
          :key="post.databaseId"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
        >
          <span class="text-sm text-emerald-600 font-semibold">
            {{ formatDate(post.date) }}
          </span>
          <h2 class="text-xl font-bold text-gray-800 mt-2 mb-3">
            {{ post.title }}
          </h2>
          <div class="text-gray-600 text-sm mb-4" v-html="post.excerpt"></div>
          
          <NuxtLink 
            :to="`/post/${post.databaseId}`"
            class="text-emerald-500 font-medium hover:text-emerald-700"
          >
            続きを読む →
          </NuxtLink>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        記事が見つかりませんでした。
      </div>
    </div>
  </div>
</template>