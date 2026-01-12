<script setup>
// シンプルにWPのURLを指定
const url = 'https://arg56sa184.cloudfree.jp/blog/graphql/'

const query = `
  query getPosts {
    posts {
      nodes {
        databaseId
        title
      }
    }
  }
`

// フェンリルの記事のように $fetch を使い、構造をシンプルにする
const { data } = await useAsyncData('posts', () => 
  $fetch(url, {
    method: 'POST',
    body: { query }
  })
)
</script>

<template>
  <div>
    <h1>ブログ記事一覧（再挑戦！）</h1>
    <ul v-if="data?.data?.posts?.nodes">
      <li v-for="post in data.data.posts.nodes" :key="post.databaseId">
        {{ post.title }}
      </li>
    </ul>
    <p v-else>データ読み込み中、またはデータがありません...</p>
    
    <hr>
    <h3>デバッグ情報（これが表示されたら成功）</h3>
    <pre>{{ data }}</pre>
  </div>
</template>