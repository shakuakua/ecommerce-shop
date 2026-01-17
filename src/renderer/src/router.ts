import { createRouter, createWebHashHistory } from 'vue-router'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./components/Home.vue') },
    { path: '/login', component: () => import('./components/Login.vue') },
    { path: '/cart', component: () => import('./components/Cart.vue'), meta: { needLogin: true } },
    { path: '/order', component: () => import('./components/Order.vue'), meta: { needLogin: true } },
    // 管理销售路由
    { path: '/admin', component: () => import('./components/admin/Layout.vue'),
      children: [
        { path: 'product', component: () => import('./components/admin/Product.vue') },
        { path: 'order', component: () => import('./components/admin/Order.vue') }
      ]
    }
  ]
})
