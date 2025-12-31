<template>
  <div class="product">
    <h2>商品管理</h2>
    <button @click="showForm=true">新增</button>
    <table class="card">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>价格</th>
          <th>库存</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in list" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.price }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button @click="edit(p)">编辑</button>
            <button @click="del(p.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 弹窗表单 -->
    <div v-if="showForm" class="mask">
      <div class="form">
        <h4>{{ form.id ? '编辑' : '新增' }}</h4>
        <input v-model="form.name" placeholder="名称" />
        <input v-model="form.price" type="number" placeholder="价格" />
        <input v-model="form.stock" type="number" placeholder="库存" />
        <input v-model="form.cover" placeholder="封面URL" />
        <div>
          <button @click="save">保存</button>
          <button @click="showForm=false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/api'

const list = ref<any[]>([])
const showForm = ref(false)
const form = ref({
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  cover: ''
})

onMounted(async () => await load())

async function load() {
  const { data } = await getProducts()
  list.value = data
}

function edit(p: any) {
  form.value = { ...p }
  showForm.value = true
}

async function save() {
  if (form.value.id) await updateProduct(form.value.id, form.value)
  else await addProduct(form.value)
  showForm.value = false
  await load()
}

async function del(id: number) {
  await deleteProduct(id)
  await load()
}
</script>

<style scoped>
.product { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid var(--border); padding: 10px; text-align: center; }
button { margin: 0 5px; }
.mask { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; }
.form { background: #fff; padding: 20px; border-radius: var(--radius); width: 320px; display: flex; flex-direction: column; gap: 1rem }
</style>
