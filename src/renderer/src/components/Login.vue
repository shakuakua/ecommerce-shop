<template>
  <NavBar />
  <div class="container form-page">
    <Card class="form-card">
      <h2>登录</h2>
      <form @submit.prevent="submit">
        <input v-model="form.email" type="email" placeholder="邮箱" required />
        <input v-model="form.password" type="password" placeholder="密码" required />
        <Button variant="primary" type="submit">登录</Button>
      </form>
      <p class="tip">没有账号？<a @click="isReg = !isReg">{{ isReg ? '去登录' : '立即注册' }}</a></p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { login, register } from '@/api'

const router = useRouter()
const isReg = ref(false)
const form = reactive({ email: '', password: '' })

async function submit() {
  const api = isReg.value ? register : login
  const { data } = await api(form)
  localStorage.setItem('token', data.token)
  localStorage.setItem('email', form.email)
  router.push('/')
}
</script>

<style scoped>
.form-page { display: flex; justify-content: center; padding-top: 10vh; }
.form-card { max-width: 400px; width: 100%; }
input { width: 100%; margin-bottom: 1rem; padding: 0.6rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); color: var(--text); }
.tip { margin-top: 1rem; font-size: 0.9rem; }
</style>
