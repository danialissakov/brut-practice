<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const sales = [
  {
    id: 1,
    image: '/images/image47.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56955',
    country: 'Италия, белое сухое, 1л',
    price: '34 000 тг',
  },
  {
    id: 2,
    image: '/images/image47.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56956',
    country: 'Италия, белое сухое, 1л',
    price: '34 000 тг',
  },
  {
    id: 3,
    image: '/images/image47.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: '34 000 тг',
  },
  {
    id: 4,
    image: '/images/image47.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: '34 000 тг',
  },
];
</script>

<template>
  <div class="max-w-7xl mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>
    <div class="flex items-center justify-between mb-10 border-b border-gray-300 pb-1"></div>
    <Swiper
      :spaceBetween="20"
      :slidesPerView="2"
      class="swiper-container"
    >
      <SwiperSlide v-for="sales in sales" :key="sales.id">
          <div class="relative w-full h-full flex justify-center items-center bg-stone-500">
            <img :src="sales.image" alt="Product Image" class="h-full object-contain" />
          </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
