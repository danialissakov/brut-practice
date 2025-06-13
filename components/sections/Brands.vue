<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string;
  }
  
  const brands = ref<Brand[]>([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('https://brut.kz/api/brands');
      const data = await response.json();
      brands.value = data;
    } catch (error) {
      console.error('Ошибка при загрузке брендов:', error);
    }
  });
  </script>

<template>
    <section class="py-10 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl mb-6 font-roboto">Бренды</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <a
            v-for="brand in brands"
            :key="brand.id"
            :href="`/brands/${brand.slug}`"
            class="flex items-center justify-center p-4"
          >
            <img
              :src="brand.logo"
              :alt="brand.name"
              class="max-h-16 object-contain"
            />
          </a>
        </div>
        <div class="flex items-center justify-between mt-10 border-b border-gray-300 pb-1">
        <div></div>
        <a href="#" class="text-sm text-gray-600 hover:underline whitespace-nowrap">
          показать еще
        </a>
      </div>
      </div>
    </section>
  </template>
  
  