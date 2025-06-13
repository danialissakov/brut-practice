<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

const products = [
  {
    id: 1,
    image: '/images/image64.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56955',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },
  {
    id: 2,
    image: '/images/image65.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56956',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },
  {
    id: 3,
    image: '/images/image66.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },
  {
    id: 4,
    image: '/images/image66.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },  {
    id: 5,
    image: '/images/image65.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },  {
    id: 6,
    image: '/images/image64.png',
    title: 'Вино Chianti Castiglioni, Frescobaldi, 2019 г.',
    code: '56957',
    country: 'Италия, белое сухое, 1л',
    price: 34000,
  },
];

function addToCart(product: any) {
  cartStore.addToCart({
    id: product.id,
    name: product.title,
    image: product.image,
    price: product.price,
    quantity: 1,
  });
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-20 px-4">
    <h2 class="text-2xl mb-6 font-roboto">КОКТЕЙЛЬНЫЕ СЕТЫ</h2>
    <div class="flex items-center justify-between mb-10 border-b border-gray-300 pb-1"></div>
    <Swiper
      :spaceBetween="10"
      :breakpoints="{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 3 }
      }"
      class="swiper-container"
    >
    <SwiperSlide v-for="product in products" :key="product.id" class="overflow-visible">
      <div class="group relative bg-white rounded-xs p-6 border border-gray-300 transition-all duration-300 transform hover:scale-100 hover:shadow-2xl hover:z-10 text-center">
          <h3 class="text-lg mb-2 font-roboto">{{ product.title }}</h3>


          <div class="relative w-full h-56 flex justify-center items-center bg-white">
            <img :src="product.image" alt="Product Image" class="h-40 object-contain" />
          </div>

          <p class="text-sm text-gray-500 mt-3">{{ product.code }}</p>
          <p class="text-sm text-gray-500">{{ product.country }}</p>
          <p class="text-xl font-bold mt-2">{{ product.price }} ₸</p>
          <div class="mt-6 flex justify-center items-center">
            <button @click="addToCart(product)" class="bg-black text-white px-10 py-2 rounded-xs">
              <img src="/icons/cart.svg" alt="cart" class="w-4 h-4" />
            </button>
          </div>
          
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

