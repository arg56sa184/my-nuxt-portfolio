<script setup>
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

// queryに featuredImage を追加
const query = `
  query getPosts {
    posts {
      nodes {
        databaseId
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
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
      </header>

      <div v-if="data?.data?.posts?.nodes" class="grid gap-8 md:grid-cols-2">
        <div v-for="post in data.data.posts.nodes" :key="post.databaseId" class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col">
          
          <div class="h-48 w-full bg-gray-200">
            <img 
              v-if="post.featuredImage" 
              :src="post.featuredImage.node.sourceUrl" 
              class="w-full h-full object-cover"
              alt=""
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          </div>

          <div class="p-6">
            <span class="text-sm text-emerald-600 font-bold">{{ formatDate(post.date) }}</span>
            <h2 class="text-xl font-bold text-gray-800 mt-2 mb-3">{{ post.title }}</h2>
            <div class="text-gray-600 text-sm mb-4 line-clamp-2" v-html="post.excerpt"></div>
            <NuxtLink :to="`/post/${post.databaseId}`" class="text-emerald-500 font-semibold hover:underline">続きを読む →</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>