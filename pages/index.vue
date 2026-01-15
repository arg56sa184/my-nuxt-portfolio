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
    # 複数形名が 'newses' の場合
    newses(first: 5, where: {status: PUBLISH}) { 
      nodes {
        databaseId
        title
        date
      }
    }
    # 複数形名が 'topics' の場合
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
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-5xl mx-auto px-4">
      
      <section class="mb-20">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-3xl font-black italic tracking-tighter">FEATURED</h2>
          <div class="h-[2px] flex-1 bg-gray-900"></div>
        </div>
        <div class="grid gap-10 md:grid-cols-2">
          <div v-for="post in data?.data?.posts?.nodes" :key="post.databaseId" class="group cursor-pointer">
            <NuxtLink :to="`/post/${post.databaseId}`">
              <div class="aspect-video overflow-hidden rounded-2xl mb-4 shadow-lg">
                <img v-if="post.featuredImage" :src="post.featuredImage.node.sourceUrl" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 class="text-xl font-bold group-hover:text-red-600 transition-colors">{{ post.title }}</h3>
            </NuxtLink>
          </div>
        </div>
      </section>

      <div class="grid md:grid-cols-2 gap-12">
        
        <section>
          <h2 class="text-xl font-bold mb-6 border-b-2 border-gray-200 pb-2">NEWS RELEASE</h2>
          <div class="space-y-4">
            <div v-for="item in data?.data?.newses?.nodes" :key="item.databaseId" class="border-b border-gray-100 pb-4">
              <NuxtLink :to="`/post/${item.databaseId}`" class="group">
                <p class="text-xs font-mono text-gray-400 mb-1">{{ formatDate(item.date) }}</p>
                <div class="flex gap-3">
                  <span class="shrink-0 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded h-fit mt-1">NEWS</span>
                  <h3 class="font-bold text-gray-800 group-hover:text-red-600">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-6 border-b-2 border-gray-200 pb-2">TOPICS</h2>
          <div class="space-y-4">
            <div v-for="item in data?.data?.topics?.nodes" :key="item.databaseId" class="border-b border-gray-100 pb-4">
              <NuxtLink :to="`/post/${item.databaseId}`" class="group">
                <p class="text-xs font-mono text-gray-400 mb-1">{{ formatDate(item.date) }}</p>
                <div class="flex gap-3">
                  <span class="shrink-0 border border-red-600 text-red-600 text-[10px] px-2 py-0.5 rounded h-fit mt-1">TOPICS</span>
                  <h3 class="font-bold text-gray-800 group-hover:text-red-600">{{ item.title }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>