<template>
  <div class="admin-layout">
    <div class="admin-header">
      <h2>销售管理后台</h2>
      <div class="mode-toggle">
        <button @click="goToHome" class="home-btn">
          切换到客户模式
        </button>
      </div>
    </div>

    <div class="admin-content">
      <div class="sidebar">
        <nav class="admin-nav">
          <router-link to="/admin/product" class="nav-item" active-class="active">
            商品管理
          </router-link>
          <router-link to="/admin/order" class="nav-item" active-class="active">
            订单管理
          </router-link>
        </nav>
      </div>

      <div class="main-content">
        <NavBar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()

function goToHome() {
  router.push('/')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.admin-header h2 {
  margin: 0;
  color: #333;
}

.mode-toggle {
  z-index: 100;
}

.home-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.home-btn:hover {
  background-color: #c0392b;
}

.admin-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 220px;
  background-color: #2c3e50;
  padding: 20px 0;
  min-height: calc(100vh - 80px);
}

.admin-nav {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 12px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: #34495e;
  color: #3498db;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 20px;
}
</style>
