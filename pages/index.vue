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

// server: false を追加して、必ずブラウザで通信させるようにします
const { data, error, refresh } = await useAsyncData('posts', () => 
  $fetch(url, {
    method: 'POST',
    body: { query }
  }), 
  { server: false } // ここを追加！
)
</script>

<template>
  <div class="p-10">
    <div v-if="error" class="text-red-500 bg-red-100 p-4 rounded">
      エラー内容: {{ error.message }}
    </div>

    <div v-if="!data && !error" class="text-gray-500">
      読み込み中（通信開始を待っています...）
    </div>

    <pre v-if="data" class="bg-gray-800 text-white p-4 rounded text-xs overflow-auto">
      {{ data }}
    </pre>
  </div>
</template>