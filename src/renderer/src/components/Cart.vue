<template>
  <NavBar />
  <div class="container">
    <h2>我的购物车</h2>
    <div v-if="!items.length" class="empty">空空如也~</div>
    <div v-else>
      <Card v-for="i in items" :key="i.id" class="cart-item">
        <img :src="i.cover" />
        <div class="info">
          <h3>{{ i.name }}</h3>
          <p>￥{{ i.price }} × {{ i.qty }}</p>
        </div>
      </Card>
      <Button variant="primary" class="checkout" @click="checkout">结算下单</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { getCart, createOrder } from '@/api'
import { useRouter } from 'vue-router'

const items = ref<any[]>([])
const router = useRouter()

onMounted(async () => {
  const { data } = await getCart()
  items.value = data
})

async function checkout() {
  await createOrder()
  alert('下单成功！邮件已发送')
  router.push('/order')
}
</script>

<style scoped>
.empty { text-align: center; padding: 3rem; color: var(--text-light); }
.cart-item { display: flex; gap: 1rem; margin-bottom: 1rem; }
.cart-item img { width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius); }
.info { flex: 1; }
.checkout { margin-top: 1.5rem; width: 100%; }
</style>
