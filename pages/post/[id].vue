<script setup>
const route = useRoute()
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql'

const query = `
  query getPost($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      title
      content
      date
    }
  }
`

const { data, error } = await useAsyncData(`post-${route.params.id}`, () => 
  $fetch(url, {
    method: 'POST',
    body: { 
      query,
      variables: { id: route.params.id } 
    }
  }), { server: false }
)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>

<template>
  <div class="min-h-screen bg-white py-12">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink to="/" class="text-emerald-600 hover:text-emerald-700 font-medium mb-8 inline-block">
        ← 記事一覧に戻る
      </NuxtLink>

      <article v-if="data?.data?.post">
        <header class="mb-8 border-b border-gray-100 pb-8">
          <span class="text-gray-500 text-sm">{{ formatDate(data.data.post.date) }}</span>
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            {{ data.data.post.title }}
          </h1>
        </header>

        <div 
  class="prose prose-slate max-w-none 
         prose-headings:text-slate-900 
         prose-p:text-slate-600 
         prose-p:leading-relaxed
         prose-h2:border-l-4 
         prose-h2:border-emerald-500 
         prose-h2:pl-4 
         prose-h2:py-1
         prose-h2:bg-slate-50"
  v-html="data.data.post.content"
></div>
      </article>

      <div v-else-if="error" class="text-red-500">
        記事の読み込みに失敗しました。
      </div>
      
      <div v-else class="text-gray-500">
        読み込み中...
      </div>
    </div>
  </div>
</template>