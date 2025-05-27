<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const images = ref<string[]>([]);


onMounted(async () => {
  try {
    const res = await fetch('https://brut.kz/api/1/slides');
    const data = await res.json();


    if (Array.isArray(data)) {
      images.value = data
        .map((product: any) => product.image)
        .filter((img: string) => !!img); 
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto py-20 px-4">
    <h2 class="text-2xl font-bold mb-6">АКЦИИ</h2>
    <div class="flex items-center justify-between mb-10 border-b border-gray-300 pb-1"></div>
    
    <Swiper
      :spaceBetween="20"
      :slidesPerView="2"
      class="swiper-container"
    >
      <SwiperSlide v-for="(image, idx) in images" :key="idx">
          <div class="relative w-full h-full flex justify-center items-center bg-stone-500">
            <img :src="image" alt="Product Image" class="h-full object-contain" />
          </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

