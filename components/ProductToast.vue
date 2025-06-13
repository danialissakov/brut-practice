<template>
  <div class="toast-wrap">
    <div class="toast-title">Товар добавлен в корзину</div>
    <hr class="toast-hr" />
    <div class="toast-content">
      <img :src="props.product.image" alt="Product" class="toast-img" />
      <div class="toast-info">
        <div class="toast-name">{{ props.product.name }}</div>
        <div>Количество: <b>{{ props.product.quantity }}</b></div>
        <div>Цена: <b>{{ props.product.price }} ₸</b></div>
        <button @click="goToCart" class="toast-btn">Перейти в корзину</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    function goToCart() {
      router.push('/cart')
    }
    // Debug: log product
    console.log('Toast product:', props.product)
    return { props, goToCart }
  }
}
</script>

<style scoped>
.toast-wrap {
  background: #fff !important;
  color: #18181b !important;
  min-width: 350px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  padding: 0;
}
.toast-title {
  font-size: 1.4rem;
  font-weight: bold;
  padding: 24px 24px 0 24px;
}
.toast-hr {
  margin: 16px 0;
  border: none;
  border-top: 2px solid #eee;
}
.toast-content {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px 24px 24px;
}
.toast-img {
  width: 80px;
  height: 120px;
  object-fit: contain;
  background: #f3f3f3;
  border-radius: 8px;
}
.toast-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.toast-btn {
  margin-top: 16px;
  padding: 12px 32px;
  background: #000;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}
.toast-btn:hover {
  background: #181848;
}
.v-toast__progress {
  background: #c49a5a !important;
  height: 6px !important;
  border-radius: 0 0 6px 6px;
}
</style> 