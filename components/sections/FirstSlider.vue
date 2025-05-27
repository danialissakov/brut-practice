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
  <div class="slider-wrapper">
    <ClientOnly>
      <Swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{ delay: 5000 }"
        :spaceBetween="30"
        :loop="true"
        :pagination="{ clickable: true }"
        effect="slide"
        class="swiper-container"
      >
        <SwiperSlide v-for="(image, idx) in images" :key="idx">
          <img :src="image" alt="Product Image" class="slide-image" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<style scoped>
.slider-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.swiper-container {
  width: 85vw;
  height: 100vh;
  margin: 30px;
  padding: 30px;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

:deep(.swiper-pagination) {
  bottom: 150px;
}
:deep(.swiper-pagination-bullet) {
  background: white;
  width: 12px;
  height: 12px;
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  background: red;
}
</style>