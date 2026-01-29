<script setup>
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

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
    newses(first: 5, where: {status: PUBLISH}) { 
      nodes {
        databaseId
        title
        date
      }
    }
    topics(first: 5, where: {status: PUBLISH}) {
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
  <div class="min-h-screen bg-gray-50">
    
    <MainVisual :items="data?.data?.posts?.nodes" />

    <div class="max-w-4xl mx-auto px-4 py-12">
      
      <section class="mb-16">
        <header class="mb-8 border-b-4 border-red-600 pb-2">
          <h2 class="text-2xl font-black italic text-gray-900">FEATURED</h2>
        </header>
        <div class="grid gap-8 md:grid-cols-2">
          <div v-for="post in data?.data?.posts?.nodes" :key="post.databaseId" class="group">
            <NuxtLink :to="`/post/${post.databaseId}`">
              <div class="aspect-video w-full bg-gray-200 overflow-hidden rounded-xl mb-4 shadow-sm">
                <img v-if="post.featuredImage" :src="post.featuredImage.node.sourceUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 class="text-lg font-bold group-hover:text-red-600 transition-colors">{{ post.title }}</h3>
              <p class="text-xs text-gray-400 mt-1 uppercase font-mono">{{ formatDate(post.date) }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <header class="mb-6 border-b border-gray-300 pb-2 flex justify-between items-end">
          <h2 class="text-xl font-bold text-gray-800">NEWS RELEASE</h2>
        </header>
        <div class="divide-y divide-gray-200 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div v-for="item in data?.data?.newses?.nodes" :key="item.databaseId" class="hover:bg-gray-50">
            <NuxtLink :to="`/post/${item.databaseId}`" class="flex flex-col md:flex-row md:items-center p-4 gap-4">
              <span class="text-sm font-mono text-gray-400 whitespace-nowrap">{{ formatDate(item.date) }}</span>
              <span class="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">NEWS</span>
              <h3 class="text-gray-800 font-medium hover:text-red-600 truncate">{{ item.title }}</h3>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section>
        <header class="mb-6 border-b border-gray-300 pb-2">
          <h2 class="text-xl font-bold text-gray-800">TOPICS</h2>
        </header>
        <div class="divide-y divide-gray-200 bg-white rounded-lg border border-gray-100 shadow-sm">
          <div v-for="item in data?.data?.topics?.nodes" :key="item.databaseId" class="hover:bg-gray-50">
            <NuxtLink :to="`/post/${item.databaseId}`" class="flex flex-col md:flex-row md:items-center p-4 gap-4">
              <span class="text-sm font-mono text-gray-400">{{ formatDate(item.date) }}</span>
              <span class="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">TOPICS</span>
              <h3 class="text-gray-800 font-medium hover:text-red-600 truncate">{{ item.title }}</h3>
            </NuxtLink>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>