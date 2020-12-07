import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home.vue')

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // 首页城市列表页
  {
    path: '/home',
    component: Home
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router