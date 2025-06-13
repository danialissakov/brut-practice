<template>
  <transition name="cart-notification-fade">
    <div v-if="notification.show && notification.product" class="fixed top-10 right-10 bg-white shadow-lg border rounded-lg p-6 z-50 flex items-center gap-4 min-w-[350px]">
      <img :src="notification.product.image" alt="Product" class="w-16 h-16 object-contain" />
      <div class="flex-1">
        <div class="font-bold">{{ notification.product.name }}</div>
        <div>Количество: {{ notification.product.quantity }}</div>
        <div>Цена: {{ notification.product.price }} ₸</div>
      </div>
      <button @click="hideNotification" class="text-xl font-bold ml-2">×</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
const notification = cartStore.notification
const hideNotification = cartStore.hideNotification
</script>

<style scoped>
.cart-notification-fade-enter-active,
.cart-notification-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.cart-notification-fade-enter-from,
.cart-notification-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
}
.cart-notification-fade-enter-to,
.cart-notification-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style> 