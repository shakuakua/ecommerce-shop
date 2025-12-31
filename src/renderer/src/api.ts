import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'
export interface Order {
  id: number;
  no: string;
  email: string;
  amount: number;
  status: string;
}
axios.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token')
  if (t) cfg.headers.Authorization = 'Bearer ' + t
  return cfg
})

export const login = (p: any) => axios.post('/user/login', p)
export const register = (p: any) => axios.post('/user/register', p)
export const getProducts = () => axios.get('/product').catch(err => {
    console.error('API connection failed:', err)
    throw err
})
export const getCart = () => axios.get('/cart')
export const addCart = (p: any) => axios.post('/cart', p)
export const createOrder = () => axios.post('/order',{
  email: localStorage.getItem('email')  // 确保这里获取的是用户邮箱
})
/* 订单 */
export const getOrders = () => axios.get<Order[]>('/order');
export const updateOrderStatus = (id: number, status: string) => axios.put(`/order/${id}`, { status })

/* 商品管理 */
export const addProduct = (p: any) => axios.post('/product', p)
export const updateProduct = (id: number, p: any) => axios.put(`/product/${id}`, p)
export const deleteProduct = (id: number) => axios.delete(`/product/${id}`)
