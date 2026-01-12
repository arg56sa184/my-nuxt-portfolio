<script setup>
// configを読み込む
const config = useRuntimeConfig()
// Vercelの設定画面の GQL_HOST を使う。なければ予備のURLを使う。
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
// サーバーサイド（Vercel）で通信を行う設定にする（server: true）
const { data, error } = await useAsyncData('posts', () => 
  $fetch(url, {
    method: 'POST',
    body: { query }
  })
)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ja-JP')
}
</script>