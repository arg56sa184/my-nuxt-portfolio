<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        
        <NuxtLink to="/" class="flex items-center gap-2 group" @click="isOpen = false">
          <div class="bg-red-600 text-white px-3 py-0.5 rounded-full font-black italic tracking-tighter text-lg transition-transform group-hover:scale-105">
            MY BLOG
          </div>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-8 text-sm font-bold text-gray-700">
          <NuxtLink to="/" class="hover:text-red-600">HOME</NuxtLink>
          <a href="#" class="hover:text-red-600">NEWS</a>
          <a href="#" class="hover:text-red-600">TOPICS</a>
          <a href="#" class="hover:text-red-600 border-l pl-8 ml-4 border-gray-300">ABOUT</a>
        </div>

        <button @click="isOpen = !isOpen" class="md:hidden relative z-[60] p-2 focus:outline-none" aria-label="メニュー">
          <div class="w-6 h-0.5 bg-gray-900 transition-all duration-300" :class="{'rotate-45 translate-y-1.5': isOpen}"></div>
          <div class="w-6 h-0.5 bg-gray-900 my-1 transition-all duration-300" :class="{'opacity-0': isOpen}"></div>
          <div class="w-6 h-0.5 bg-gray-900 transition-all duration-300" :class="{'-rotate-45 -translate-y-1.5': isOpen}"></div>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 md:hidden">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm h-screen" @click="isOpen = false"></div>
        
        <nav class="absolute right-0 top-0 h-screen w-64 bg-white shadow-xl p-8 pt-24 overflow-y-auto">
          <ul class="space-y-6 text-lg font-black italic">
            <li><NuxtLink to="/" @click="isOpen = false" class="block hover:text-red-600 border-b pb-2">HOME</NuxtLink></li>
            <li><a href="#" @click="isOpen = false" class="block hover:text-red-600 border-b pb-2">NEWS</a></li>
            <li><a href="#" @click="isOpen = false" class="block hover:text-red-600 border-b pb-2">TOPICS</a></li>
            <li><a href="#" @click="isOpen = false" class="block hover:text-red-600 border-b pb-2">ABOUT</a></li>
          </ul>
          <p class="mt-12 text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">© 2026 MY BLOG</p>
        </nav>
      </div>
    </transition>
  </nav>
</template>

<script setup>
const isOpen = ref(false) // メニューが開いているかどうかの状態
</script>