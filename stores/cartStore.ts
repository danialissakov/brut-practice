// stores/cartStore.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    notification: {
      show: false,
      product: null as null | CartItem
    }
  }),

  getters: {
    totalCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0)
  },

  actions: {
    addToCart(product: CartItem) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        this.items.push({ ...product })
      }
      // Show notification
      this.notification.product = { ...product }
      this.notification.show = true
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },
    hideNotification() {
      this.notification.show = false
    }
  }
})