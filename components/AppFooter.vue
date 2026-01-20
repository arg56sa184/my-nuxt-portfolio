<template>
  <footer class="bg-gray-900 text-white mt-20">
    <div class="max-w-5xl mx-auto px-4 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 class="font-bold mb-4 text-gray-400 text-sm tracking-widest">MENU</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:underline">ホーム</NuxtLink></li>
            <li><a href="#" class="hover:underline">ニュース</a></li>
            <li><a href="#" class="hover:underline">トピックス</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4 text-gray-400 text-sm tracking-widest">SUPPORT</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:underline">お問い合わせ</a></li>
            <li><a href="#" class="hover:underline">プライバシーポリシー</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-2xl font-black italic tracking-tighter">
          MY BLOG <span class="text-red-600">.</span>
        </div>
        <p class="text-xs text-gray-500">
          © 2026 Your Name
        </p>
      </div>
    </div>
  </footer>
</template>