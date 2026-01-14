<script setup>
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

// queryに featuredImage を追加
const query = `
  query getHomeData {
    posts(first: 4) {
      nodes {
        databaseId
        title
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    newses(first: 5) { 
      nodes {
        databaseId
        title
        date
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
      
      <header class="mb-8 border-b-2 border-gray-900 pb-2">
        <h2 class="text-2xl font-black">FEATURED</h2>
      </header>

      <div v-if="data?.data?.posts?.nodes" class="grid gap-8 md:grid-cols-2 mb-16">
        <div v-for="post in data.data.posts.nodes.slice(0, 2)" :key="post.databaseId" class="bg-white group cursor-pointer">
          <NuxtLink :to="`/post/${post.databaseId}`">
            <div class="aspect-video w-full bg-gray-200 overflow-hidden rounded-lg mb-4">
              <img 
                v-if="post.featuredImage" 
                :src="post.featuredImage.node.sourceUrl" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 class="text-lg font-bold group-hover:text-emerald-600 transition-colors">{{ post.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ formatDate(post.date) }}</p>
          </NuxtLink>
        </div>
      </div>

      <header class="mb-6 border-b border-gray-300 pb-2 flex justify-between items-end">
        <h2 class="text-xl font-bold">LATEST NEWS</h2>
        <span class="text-xs text-gray-500 font-bold">お知らせ一覧 ＞</span>
      </header>

      <div class="space-y-0">
        <div v-for="post in data.data.posts.nodes.slice(2)" :key="post.databaseId" 
             class="border-b border-gray-200 py-4 hover:bg-gray-100 transition-colors px-2">
          <NuxtLink :to="`/post/${post.databaseId}`" class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <span class="text-sm font-mono text-gray-400">{{ formatDate(post.date) }}</span>
            <span class="text-sm font-bold text-emerald-600 border border-emerald-600 px-2 py-0.5 rounded md:w-24 text-center text-xs">NEWS</span>
            <h3 class="text-gray-800 font-medium flex-1">{{ post.title }}</h3>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>