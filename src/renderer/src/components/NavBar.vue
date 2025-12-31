<template>
  <header class="nav">
    <div class="container flex">
      <h1 class="logo">商城</h1>
      <nav class="flex">
        <router-link to="/">首页</router-link>
        <router-link to="/cart">购物车</router-link>
        <router-link to="/order">订单</router-link>
        <router-link to="/login">登录</router-link>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.nav { background: var(--bg-card); border-bottom: 1px solid var(--border); }
.logo { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
nav a { padding: 0.5rem 1rem; border-radius: var(--radius); transition: background .2s; }
nav a.router-link-active { background: var(--primary); color: #fff; }
</style>
