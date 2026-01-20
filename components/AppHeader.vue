<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="bg-red-600 text-white px-3 py-0.5 rounded-full font-black italic tracking-tighter text-lg transition-transform group-hover:scale-105">
            MY BLOG
          </div>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700">
          <NuxtLink to="/" class="hover:text-red-600 transition-colors">HOME</NuxtLink>
          <a href="#" class="hover:text-red-600 transition-colors">NEWS</a>
          <a href="#" class="hover:text-red-600 transition-colors">TOPICS</a>
          <a href="#" class="hover:text-red-600 transition-colors border-l pl-8 ml-4 border-gray-300">ABOUT</a>
        </div>

        <div class="md:hidden">
          <button class="p-2">
            <div class="w-6 h-0.5 bg-gray-900 mb-1"></div>
            <div class="w-6 h-0.5 bg-gray-900 mb-1"></div>
            <div class="w-6 h-0.5 bg-gray-900"></div>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>