<template>
  <header class="w-full">
    <div class="border-b border-gray-200"></div>

    <div class="flex items-center justify-between px-4 py-3 md:hidden w-full">
      <button>
        <img src="/icons/menu.svg" alt="menu" class="w-8 h-8" />
      </button>
      <img src="/Logo.svg" alt="BRUT" class="h-10 mx-auto" />
      <div class="flex items-center space-x-6">
        <img src="/icons/search.svg" alt="search" class="w-7 h-7" />
        <img src="/icons/heart.svg" alt="favorites" class="w-7 h-7" />
        <div class="relative">
          <img src="/icons/buy.svg" alt="cart" class="w-10 h-10" @click="openCart" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full"
          >
            {{ cartCount }}
          </span>
          <CartDropdown :visible="cartDropdownOpen" :close="closeCart" />
        </div>
        <img src="/icons/user.svg" alt="user" class="w-7 h-7" />
      </div>
    </div>


    <div class="hidden md:flex flex-wrap justify-between items-center px-4 md:px-10 py-3 gap-4">
      <div class="flex items-center space-x-6 text-gray-700 text-sm">
        <div class="flex items-center space-x-1">
          <img src="/icons/navigations1.svg" alt="location" class="w-4 h-4" />
          <span>Алматы</span>
        </div>
        <div class="flex items-center space-x-1">
          <img src="/icons/nav1.svg" alt="map" class="w-4 h-4" />
          <span>Адреса магазинов</span>
        </div>
        <div class="flex items-center space-x-1">
          <img src="/icons/Frame.svg" alt="info" class="w-4 h-4" />
          <span>О компании</span>
        </div>
      </div>

      <div class="flex justify-center md:justify-start w-full md:w-auto">
        <img src="/Logo.svg" alt="BRUT" class="h-8" />
      </div>

      <div class="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-end relative">
        <input
          type="text"
          placeholder="🔍 Поиск"
          class="bg-gray-100 px-4 py-1 rounded-md text-sm focus:outline-none w-full max-w-[160px] md:max-w-[200px]"
        />
        <img src="/icons/heart.svg" alt="favorites" class="w-5 h-5" />
        <div class="relative">
          <img src="/icons/buy.svg" alt="cart" class="w-8 h-8" @click="openCart" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full"
          >
            {{ cartCount }}
          </span>
          <CartDropdown :visible="cartDropdownOpen" :close="closeCart" />
        </div>
        <img src="/icons/user.svg" alt="user" class="w-5 h-5" />
      </div>
    </div>

    <div class="border-b border-gray-200"></div>


    <nav
      class="hidden md:flex flex-wrap justify-center items-center w-full px-4 md:px-10 py-2 gap-4 md:gap-6 text-sm text-gray-800 relative"
    >
      <button class="absolute left-4 md:static md:ml-0 block">
        <img src="/icons/menu.svg" alt="menu" class="w-5 h-5" />
      </button>
      <!-- Навигационные элементы с выпадающими меню -->
      <div 
        v-for="(item, index) in navItems" 
        :key="index" 
        class="hidden md:block relative nav-item"
        @mouseenter="openDropdown(index)"
        @mouseleave="closeDropdown(index)"
      >
        <span class="text-center cursor-pointer hover:text-gray-600 py-2 block whitespace-nowrap">{{ item.title }}</span>
        <div 
          v-if="item.isOpen"
          class="dropdown-menu absolute bg-white shadow-lg rounded-md p-4 z-50"
          :style="getDropdownPosition(index)"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 overflow-hidden">
            <div 
              v-for="(category, catIndex) in item.subcategories" 
              :key="catIndex" 
              class="dropdown-column"
            >
              <h3 class="font-medium text-gray-900 border-b pb-2 mb-2 text-sm">{{ category.title }}</h3>
              <ul class="space-y-1.5">
                <li v-for="(subitem, subIndex) in category.items" :key="subIndex">
                  <a href="#" class="text-gray-700 hover:text-primary text-xs hover:underline block transition-colors">{{ subitem }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="border-b border-gray-200"></div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import CartDropdown from './CartDropdown.vue'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalCount)
const windowWidth = ref<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)
const cartDropdownOpen = ref(false)

const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})

const getDropdownPosition = (index: number) => {
  const maxWidth = Math.min(windowWidth.value - 32, 800)
  let columns = 1
  if (windowWidth.value >= 1280) columns = 4
  else if (windowWidth.value >= 1024) columns = 3
  else if (windowWidth.value >= 640) columns = 2

  const categoryItems = navItems[index].subcategories.length
  const neededColumns = Math.min(categoryItems, columns)
  let dropdownWidth = Math.min(maxWidth, neededColumns * 200)

  if (windowWidth.value < 640) {
    dropdownWidth = Math.min(dropdownWidth, windowWidth.value - 32)
  }

  const navElements = document.querySelectorAll('.nav-item')
  const navElement = navElements.length > index ? navElements[index] : null
  let left = '50%'
  let transform = 'translateX(-50%)'

  if (navElement) {
    const rect = navElement.getBoundingClientRect()
    const elementCenter = rect.left + rect.width / 2
    const leftEdgePosition = elementCenter - dropdownWidth / 2
    if (leftEdgePosition < 16) {
      const offset = 16 - leftEdgePosition
      left = `calc(50% + ${offset}px)`
    }
    const rightEdgePosition = elementCenter + dropdownWidth / 2
    if (rightEdgePosition > windowWidth.value - 16) {
      const offset = rightEdgePosition - (windowWidth.value - 16)
      left = `calc(50% - ${offset}px)`
    }
  }

  return {
    width: `${dropdownWidth}px`,
    left,
    transform
  }
}

const navItems = reactive([
  {
    title: 'ВИНО',
    isOpen: false,
    subcategories: [
      {
        title: 'По странам',
        items: ['Франция', 'Италия', 'Испания', 'Грузия', 'Чили']
      },
      {
        title: 'По цвету',
        items: ['Красное', 'Белое', 'Розовое', 'Оранжевое']
      },
      {
        title: 'Популярное',
        items: ['Новинки', 'Топ продаж', 'Выбор сомелье']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'ШАМПАНСКОЕ И ИГРИСТОЕ',
    isOpen: false,
    subcategories: [
      {
        title: 'Типы',
        items: ['Шампанское', 'Просекко', 'Кава', 'Игристое']
      },
      {
        title: 'По сладости',
        items: ['Брют', 'Сухое', 'Полусухое', 'Сладкое']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'КРЕПКИЕ НАПИТКИ',
    isOpen: false,
    subcategories: [
      {
        title: 'Категории',
        items: ['Виски', 'Водка', 'Коньяк', 'Ром', 'Текила', 'Джин']
      },
      {
        title: 'По регионам',
        items: ['Шотландия', 'Ирландия', 'Япония', 'США', 'Россия']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'ЛИКЁРЫ И БИТТЕРЫ',
    isOpen: false,
    subcategories: [
      {
        title: 'Типы ликёров',
        items: ['Сливочные', 'Фруктовые', 'Травяные', 'Кофейные']
      },
      {
        title: 'Биттеры',
        items: ['Классические', 'Ароматические', 'Для коктейлей']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'FOOD PAIRINGS',
    isOpen: false,
    subcategories: [
      {
        title: 'К мясу',
        items: ['Говядина', 'Свинина', 'Птица', 'Дичь']
      },
      {
        title: 'К сыру',
        items: ['Твердые сыры', 'Мягкие сыры', 'Голубые сыры']
      },
      {
        title: 'К десертам',
        items: ['Шоколад', 'Фрукты', 'Пирожные']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'СЕТЫ',
    isOpen: false,
    subcategories: [
      {
        title: 'Тематические',
        items: ['Для вечеринки', 'Подарочные', 'Дегустационные']
      },
      {
        title: 'Акции',
        items: ['Распродажа', 'Скидки недели', 'Комплекты со скидкой']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  },
  {
    title: 'СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ',
    isOpen: false,
    subcategories: [
      {
        title: 'Акции',
        items: ['Распродажа', 'Скидки недели', 'Комплекты со скидкой']
      },
      {
        title: 'Сезонные',
        items: ['Летняя коллекция', 'Зимние напитки', 'Новогодняя подборка']
      },
      {
        title: 'По цене',
        items: ['до 10000 ₸', '10000 - 20000 ₸', '20000 - 30000 ₸', '30000 - 50000 ₸', 'от 50000 ₸ и дороже']
      }
    ]
  }
])

const openDropdown = (index: number) => {
  navItems.forEach((item, i) => {
    if (i !== index) {
      item.isOpen = false
    }
  })
  navItems[index].isOpen = true
}

const closeDropdown = (index: number) => {
  navItems[index].isOpen = false
}

function openCart() { cartDropdownOpen.value = true }
function closeCart() { cartDropdownOpen.value = false }
</script>

<style scoped>

.nav-item {
  position: static;
}

@media (min-width: 768px) {
  .nav-item {
    position: relative;
  }
}


.dropdown-menu {
  top: 100%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  will-change: transform, opacity;
  transform-origin: top center;
  animation: dropdownFadeIn 0.15s ease-out;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  z-index: 999; 
}


@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(5px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}


.text-primary {
  color: #7c3aed;
}


.dropdown-column {
  padding: 0 0.5rem;
}


.overflow-hidden {
  overflow: hidden;
}


.dropdown-menu h3 {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.dropdown-menu a {
  font-size: 0.75rem;
  line-height: 1rem;
}


@media (max-width: 1023px) {
  .dropdown-menu {
    padding: 0.75rem;
  }
  
  .gap-x-4 {
    column-gap: 0.5rem;
  }
  
  .gap-y-4 {
    row-gap: 0.5rem;
  }
}


.whitespace-nowrap {
  white-space: nowrap;
}


@media (max-width: 991px) {
  .dropdown-menu {
    max-width: calc(100vw - 32px);
    left: 50% !important; 
  }
}


.nav-item:first-child .dropdown-menu {
  left: 0;
  transform: none;
}

.nav-item:last-child .dropdown-menu {
  left: auto;
  right: 0;
  transform: none;
}
</style>