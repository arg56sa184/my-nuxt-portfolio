<template>
  <footer class="bg-[#e6e6e6] text-gray-800 mt-20 border-t-8 border-red-600">
    <div class="bg-white py-6 border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 flex justify-center gap-8">
        <a href="#" class="text-sm font-bold flex items-center gap-2 hover:text-red-600">
          <span class="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">X</span>
          公式X
        </a>
        <a href="#" class="text-sm font-bold flex items-center gap-2 hover:text-red-600">
          <span class="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 text-white rounded-full flex items-center justify-center text-[10px]">Insta</span>
          Instagram
        </a>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div class="col-span-2 lg:col-span-1">
          <div class="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-xl font-black italic tracking-tighter mb-4">
            MY BLOG
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">
            WordPress × Nuxt 3で贈る<br>任天堂風ブログプロジェクト。
          </p>
        </div>

        <div>
          <h4 class="font-bold mb-6 text-sm border-l-4 border-red-600 pl-2">コンテンツ</h4>
          <ul class="space-y-3 text-sm font-medium">
            <li><NuxtLink to="/" class="hover:text-red-600 transition-colors">ホーム</NuxtLink></li>
            <li><a href="#" class="hover:text-red-600 transition-colors">ニュース</a></li>
            <li><a href="#" class="hover:text-red-600 transition-colors">トピックス</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-6 text-sm border-l-4 border-red-600 pl-2">このサイトについて</h4>
          <ul class="space-y-3 text-sm font-medium">
            <li><a href="#" class="hover:text-red-600 transition-colors">プロフィール</a></li>
            <li><a href="#" class="hover:text-red-600 transition-colors">お問い合わせ</a></li>
          </ul>
        </div>

        <div class="col-span-2 md:col-span-1">
          <h4 class="font-bold mb-6 text-sm border-l-4 border-red-600 pl-2">規約・ポリシー</h4>
          <ul class="space-y-3 text-sm font-medium text-gray-500">
            <li><a href="#" class="hover:text-red-600 transition-colors italic">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-red-600 transition-colors italic">Terms of Use</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 text-white py-4">
      <div class="max-w-6xl mx-auto px-4 flex justify-between items-center text-[10px] tracking-widest font-bold">
        <span>© 2026 YOUR PROJECT NAME</span>
        <span class="text-gray-500">JAPAN</span>
      </div>
    </div>
  </footer>
</template>