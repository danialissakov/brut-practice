<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

interface AttributeValue {
  name: string;
}

interface Attribute {
  name: string;
  values: AttributeValue[];
}

interface Product {
  id: number;
  name: string;
  image: string;
  sku: string;
  price: number;
  attributes: Attribute[];
  quantity?: number;
  title?: string;
}

const products = ref<Product[]>([])

onMounted(async () => {
  try {
    const res = await fetch('https://brut.kz/api/selection/2')
    const data = await res.json()

    const selection = data.selections?.[0]
    if (!selection || !Array.isArray(selection.products)) return

    products.value = selection.products
      .filter((product: any) => product.is_active && product.image)
      .map((product: any) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        sku: product.sku,
        price: product.price,
        attributes: product.attributes,
        quantity: 1,
      }))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
})

function getCountry(product: Product): string | null {
  const countryAttr = product.attributes.find(attr => attr.name === 'Страна')
  return countryAttr?.values?.[0]?.name || null
}

function increase(product: Product) {
  product.quantity = (product.quantity || 1) + 1
}

function decrease(product: Product) {
  if ((product.quantity || 1) > 1) {
    product.quantity!--
  }
}

function addToCart(product: Product) {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity: product.quantity || 1,
  })
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-20 px-4">
    <h2 class="text-2xl mb-5 font-roboto">ВЫБОР ПОКУПАТЕЛЕЙ</h2>
    <div class="flex items-center justify-between mb-10 border-b border-gray-300 pb-1"></div>

    <Swiper
      :spaceBetween="10"
      :breakpoints="{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 3.4 },
        1280: { slidesPerView: 4.4 }
      }"
      class="swiper-container"
    >
      <SwiperSlide v-for="product in products" :key="product.id" class="overflow-visible">
        <div class="group relative bg-white rounded-xs p-6 border border-gray-300 transition-all duration-300 transform hover:scale-100 hover:shadow-2xl hover:z-10 text-center">
          <h3 class="text-base mb-3 line-clamp-10 h-12 font-roboto">
            {{ product.name }}
          </h3>

          <div class="relative w-full h-48 flex justify-center items-center mb-3">
            <img :src="product.image" alt="Product Image" class="max-h-40 object-contain" />
          </div>

          <p v-if="getCountry(product)" class="text-sm text-gray-500 mb-1">
            Страна: {{ getCountry(product) }}
          </p>

          <p class="text-xl font-bold mb-4">{{ product.price }} ₸</p>

          <div class="flex justify-between items-center gap-2">
            <div class="flex items-center border border-gray-300 rounded">
              <button @click="decrease(product)" class="px-3 py-1 border-r border-gray-300">−</button>
              <span class="px-4">{{ product.quantity }}</span>
              <button @click="increase(product)" class="px-3 py-1 border-l border-gray-300">+</button>
            </div>
            <button @click="addToCart(product)" class="bg-black text-white px-5 py-2 rounded">
              <img src="/icons/cart.svg" alt="cart" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background: black;
  width: 10px;
  height: 10px;
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  background: red;
}
</style>