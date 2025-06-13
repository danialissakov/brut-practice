<template>
  <div v-if="visible" class="cart-dropdown-overlay" @click.self="close">
    <div class="cart-dropdown">
      <div class="cart-header">
        <span>Корзина</span>
        <button class="close-btn" @click="close">✕</button>
      </div>
      <div v-if="cartItems.length">
        <div v-for="(item, idx) in cartItems" :key="item.id" class="cart-item-row">
          <div class="cart-item-img-wrap">
            <img :src="item.image" alt="" class="cart-img" />
          </div>
          <div class="cart-item-main">
            <div class="cart-item-top">
              <div class="cart-title">{{ item.name }}</div>
              <button class="cart-remove" @click="remove(item)">
                <svg data-v-19111dea="" data-v-47b1f4e4="" data-v-ff25f13c="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-19111dea="" d="M12.0622 15.1112H3.93775C3.76673 15.1072 3.59817 15.0695 3.44172 15.0003C3.28527 14.9311 3.14398 14.8317 3.02594 14.7079C2.9079 14.5841 2.81541 14.4382 2.75376 14.2786C2.69211 14.1191 2.66251 13.9489 2.66664 13.7779V4.99121H3.55553V13.7779C3.55129 13.8322 3.55782 13.8868 3.57476 13.9386C3.5917 13.9904 3.6187 14.0383 3.65422 14.0796C3.68974 14.1209 3.73308 14.1548 3.78174 14.1793C3.8304 14.2037 3.88342 14.2184 3.93775 14.2223H12.0622C12.1165 14.2184 12.1696 14.2037 12.2182 14.1793C12.2669 14.1548 12.3102 14.1209 12.3457 14.0796C12.3812 14.0383 12.4082 13.9904 12.4252 13.9386C12.4421 13.8868 12.4487 13.8322 12.4444 13.7779V4.99121H13.3333V13.7779C13.3374 13.9489 13.3078 14.1191 13.2462 14.2786C13.1845 14.4382 13.092 14.5841 12.974 14.7079C12.856 14.8317 12.7147 14.9311 12.5582 15.0003C12.4018 15.0695 12.2332 15.1072 12.0622 15.1112Z" fill="black"></path> <path data-v-19111dea="" d="M13.68 3.99997H2.22222C2.10434 3.99997 1.9913 3.95315 1.90795 3.8698C1.8246 3.78645 1.77777 3.6734 1.77777 3.55553C1.77777 3.43765 1.8246 3.32461 1.90795 3.24126C1.9913 3.15791 2.10434 3.11108 2.22222 3.11108H13.68C13.7979 3.11108 13.9109 3.15791 13.9943 3.24126C14.0776 3.32461 14.1244 3.43765 14.1244 3.55553C14.1244 3.6734 14.0776 3.78645 13.9943 3.8698C13.9109 3.95315 13.7979 3.99997 13.68 3.99997Z" fill="black"></path> <path data-v-19111dea="" d="M9.33331 5.77783H10.2222V12.4445H9.33331V5.77783Z" fill="black"></path> <path data-v-19111dea="" d="M5.77777 5.77783H6.66666V12.4445H5.77777V5.77783Z" fill="black"></path> <path data-v-19111dea="" d="M10.2222 2.60447H9.37777V1.7778H6.62222V2.60447H5.77777V1.7778C5.77749 1.54956 5.86501 1.32995 6.02222 1.16447C6.17942 0.998993 6.39426 0.900328 6.62222 0.888916H9.37777C9.60573 0.900328 9.82057 0.998993 9.97777 1.16447C10.135 1.32995 10.2225 1.54956 10.2222 1.7778V2.60447Z" fill="black"></path></svg>
              </button>
            </div>
            <div class="cart-item-bottom">
              <div class="qty-block">
                <input type="number" v-model.number="item.quantity" min="1" @change="updateQty(item)" class="qty-input" />
                <div class="qty-arrows-btns">
                  <button class="arrow-btn" @click="increment(item)">
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 6l3 3H6z" fill="currentColor"/></svg>
                  </button>
                  <button class="arrow-btn" @click="decrement(item)">
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 12l-3-3h6z" fill="currentColor"/></svg>
                  </button>
                </div>
              </div>
              <div class="cart-price">{{ item.price * item.quantity }} ₸</div>
            </div>
          </div>
          <div v-if="idx < cartItems.length - 1" class="cart-divider"></div>
        </div>
        <div class="cart-summary">
          <div class="cart-summary-row">
            <span class="cart-summary-label">{{ cartItems.length }} товара</span>
            <span class="cart-summary-total">Итого: {{ total }} ₸</span>
          </div>
          <div class="cart-summary-note">без учета стоимости доставки</div>
        </div>
        <button class="cart-btn" @click="goToCart">Перейти в корзину</button>
      </div>
      <div v-else class="cart-empty">Корзина пуста</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
const props = defineProps<{ visible: boolean, close: () => void }>()
const cartStore = useCartStore()
const router = useRouter()
const cartItems = computed(() => cartStore.items)
const total = computed(() => cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0))

function increment(item: any) {
  cartStore.addToCart({ ...item, quantity: 1 })
}
function decrement(item: any) {
  if (item.quantity > 1) {
    cartStore.addToCart({ ...item, quantity: -1 })
  }
}
function updateQty(item: any) {
  if (item.quantity < 1) item.quantity = 1
}
function goToCart() {
  props.close()
  router.push('/cart')
}
function remove(item: any) {
  cartStore.items = cartStore.items.filter((i: any) => i.id !== item.id)
}
</script>

<style scoped>
.cart-dropdown-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.1);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}
.cart-dropdown {
  background: #fff;
  width: 420px;
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  border-radius: 8px;
  margin: 24px 24px 0 0;
  padding: 24px 24px 18px 24px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
}
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 18px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #444;
  line-height: 1;
}
.cart-item-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin: 28px 0 0 0;
  padding: 0 0 28px 0;
  position: relative;
}
.cart-item-img-wrap {
  flex: 0 0 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-img {
  width: 60px;
  height: 110px;
  object-fit: contain;
  border-radius: 4px;
  background: #f3f3f3;
}
.cart-item-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cart-item-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.cart-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: #18181b;
  margin-bottom: 2px;
  line-height: 1.3;
}
.cart-remove {
  background: none;
  border: none;
  color: #222;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 6px;
  transition: color 0.15s;
  padding: 0;
  display: flex;
  align-items: center;
}
.cart-remove:hover {
  color: #e53e3e;
}
.cart-item-bottom {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 8px;
}
.qty-block {
  display: flex;
  align-items: center;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  height: 48px;
  padding: 0 0 0 0;
  position: relative;
}
.qty-input {
  width: 54px;
  height: 48px;
  font-size: 1.35rem;
  font-weight: 700;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;
  -moz-appearance: textfield;
}
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-arrows-btns {
  display: flex;
  flex-direction: column;
  height: 48px;
  justify-content: center;
  border-left: 1.5px solid #d1d5db;
}
.arrow-btn {
  background: none;
  border: none;
  width: 32px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #222;
  transition: background 0.15s, color 0.15s;
  font-size: 1.1rem;
}
.arrow-btn:hover {
  background: #ede9fe;
  color: #4c1d95;
}
.cart-price {
  min-width: 90px;
  text-align: right;
  font-weight: 700;
  font-size: 1.35rem;
  color: #18181b;
}
.cart-divider {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #e5e7eb;
  margin: 0;
}
.cart-summary {
  margin: 32px 0 18px 0;
  border-top: 1.5px solid #e5e7eb;
  padding-top: 18px;
}
.cart-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.18rem;
  font-weight: 700;
  color: #181848;
  margin-bottom: 4px;
}
.cart-summary-label {
  font-weight: 700;
  color: #181848;
}
.cart-summary-total {
  font-weight: 700;
  color: #181848;
}
.cart-summary-note {
  font-size: 0.98rem;
  color: #888;
  font-style: italic;
  margin-top: 2px;
}
.cart-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 18px 0;
  font-size: 1.18rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  letter-spacing: 0.01em;
  transition: background 0.15s;
}
.cart-btn:hover {
  background: #181848;
}
.cart-empty {
  text-align: center;
  color: #888;
  padding: 32px 0;
}
</style> 