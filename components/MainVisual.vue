<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 親コンポーネント（index.vue）から記事データを受け取る
const props = defineProps({
  items: Array
});

const modules = [Autoplay, Pagination, Navigation];
</script>

<template>
  <div class="relative w-full overflow-hidden bg-gray-100">
    <swiper
      :modules="modules"
      :slides-per-view="1.1"
      :centered-slides="true"
      :space-between="20"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="mySwiper !pb-12 !pt-8"
      :breakpoints="{
        '768': { slidesPerView: 1.5, spaceBetween: 40 }
      }"
    >
      <swiper-slide v-for="post in items" :key="post.databaseId">
        <NuxtLink :to="`/post/${post.databaseId}`" class="group block relative aspect-video overflow-hidden rounded-3xl shadow-2xl">
          <img 
            v-if="post.featuredImage" 
            :src="post.featuredImage.node.sourceUrl" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
            <h2 class="text-white text-xl md:text-4xl font-black italic leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform">
              {{ post.title }}
            </h2>
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
/* Swiperのドットの色を任天堂レッドに */
.swiper-pagination-bullet-active {
  background: #e60012 !important;
}
</style>