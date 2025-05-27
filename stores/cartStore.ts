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
    items: [] as CartItem[]
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
    }
  }
})