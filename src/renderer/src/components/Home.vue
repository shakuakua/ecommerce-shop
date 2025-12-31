<template>
  <NavBar />
  <div class="container">
    <div class="admin-toggle">
      <button @click="goToAdmin" class="admin-btn">
        我是销售
      </button>
    </div>
    <h2 class="title">热门商品</h2>
    <div class="grid grid-3">
      <Card v-for="p in products" :key="p.id" class="product-card">
        <img :src="p.cover" />
        <h3>{{ p.name }}</h3>
        <p class="price">￥{{ p.price }}</p>
        <Button variant="primary" @click="addToCart(p.id)">加入购物车</Button>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { getProducts, addCart } from '@/api'
import { useRouter } from 'vue-router'

const products = ref<any[]>([])
const router = useRouter()

onMounted(async () => {
  const { data } = await getProducts()
  products.value = data
})
function goToAdmin() {
  router.push('/admin')
}
function addToCart(id: number) {
  if (!localStorage.getItem('token')) {
    router.push('/login')
    return
  }
  addCart({ productId: id, qty: 1 }).then(() => alert('已加入'))
}
</script>

<style scoped>
.title { margin-bottom: 1.5rem; font-size: 1.8rem; }
.product-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: var(--radius); }
.price { font-size: 1.2rem; color: var(--primary); margin: 0.5rem 0 1rem; }
</style>
