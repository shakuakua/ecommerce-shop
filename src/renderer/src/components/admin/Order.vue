<template>
  <div class="order">
    <h2>订单管理</h2>
    <table class="card">
      <thead>
        <tr>
          <th>订单号</th>
          <th>用户</th>
          <th>金额</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.no }}</td>
          <td>{{ o.email }}</td>
          <td>{{ o.amount }}</td>
          <td>{{ o.status }}</td>
          <td><button @click="ship(o.id)">发货</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrders, updateOrderStatus } from '@/api'

interface Order {
  id: number
  no: string
  email: string
  amount: number
  status: string
}

const orders = ref<Order[]>([])

onMounted(async () => await load())

async function load() {
  const { data } = await getOrders()
  orders.value = data
}

async function ship(id: number) {
  await updateOrderStatus(id, 'shipped')
  await load()
}
</script>

<style scoped>
.order { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid var(--border); padding: 10px; text-align: center; }
button { margin: 0 5px; }
</style>
