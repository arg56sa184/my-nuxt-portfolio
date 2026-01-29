<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// 全機能入りのCSSを一括で読み込む（これが一番確実です！）
import 'swiper/css';
import 'swiper/css/bundle';

const props = defineProps({
  items: Array
});

const modules = [Autoplay, Pagination, Navigation];
</script>

<template>
  <div v-if="items && items.length > 0" class="relative w-full overflow-hidden bg-gray-100">
    <swiper
      :modules="modules"
      :slides-per-view="1.2"
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
        <NuxtLink :to="`/post/${post.databaseId}`" class="group block relative aspect-video overflow-hidden rounded-3xl shadow-2xl bg-gray-200">
          <img 
            v-if="post.featuredImage" 
            :src="post.featuredImage.node.sourceUrl" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            @error="(e) => e.target.style.display = 'none'"
          />
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-400">
            No Image
          </div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
            <h2 class="text-white text-xl md:text-3xl font-black italic leading-tight">
              {{ post.title }}
            </h2>
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
  
  <div v-else class="py-20 text-center text-gray-400">
    Loading Featured Posts...
  </div>
</template>

<style scoped>
/* スライダーのドット位置を調整 */
:deep(.swiper-pagination) {
  bottom: 0px !important;
}
:deep(.swiper-pagination-bullet-active) {
  background: #e60012 !important;
  width: 20px;
  border-radius: 4px;
}
</style>