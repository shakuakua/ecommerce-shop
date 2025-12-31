<template>
  <div class="order">
    <h2>我的订单</h2>
    <div v-if="!orders.length">暂无订单</div>
    <div v-for="o in orders" :key="o.id" class="card">
      <p>订单号：{{ o.no }}</p>
      <p>金额：￥{{ o.amount }}</p>
      <p>状态：{{ o.status }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getOrders } from '@/api'

const orders = ref<any[]>([])

onMounted(async () => {
  const { data } = await getOrders()
  orders.value = data
})
</script>

<style scoped>
.card{padding:1rem;margin-bottom:1rem;border:1px solid #ccc;border-radius:6px}
</style>