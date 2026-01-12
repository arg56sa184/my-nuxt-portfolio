<script setup>
const route = useRoute()
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

// URLの[id]部分を取得する
const postId = route.params.id

// 特定の1件だけを取得するクエリ
const query = `
  query getPost($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      title
      date
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`

const { data, error } = await useAsyncData(`post-${postId}`, () => 
  $fetch(url, {
    method: 'POST',
    body: { 
      query,
      variables: { id: postId } // IDをWordPressに伝える
    }
  })
)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>

<template>
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink to="/" class="text-emerald-500 hover:text-emerald-700 mb-8 inline-block">
        ← 記事一覧に戻る
      </NuxtLink>

      <div v-if="data?.data?.post">
        <img 
    v-if="data.data.post.featuredImage" 
    :src="data.data.post.featuredImage.node.sourceUrl" 
    class="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
  />
        <header class="mb-8">
          <p class="text-gray-500 text-sm mb-2">{{ formatDate(data.data.post.date) }}</p>
          <h1 class="text-4xl font-bold text-gray-900 leading-tight">
            {{ data.data.post.title }}
          </h1>
        </header>

        <div class="prose prose-emerald max-w-none" v-html="data.data.post.content"></div>
      </div>

      <div v-else-if="error" class="text-red-500">
        記事の読み込みに失敗しました。
      </div>
    </div>
  </div>
</template>

<style>
/* WordPressの本文（HTML）を綺麗に見せるための簡単なスタイル */
.prose p { margin-bottom: 1.5rem; line-height: 1.8; color: #374151; }
.prose h2 { font-size: 1.5rem; font-bold: 700; margin-top: 2rem; margin-bottom: 1rem; }
</style>