import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home.vue')
const City = () => import('views/city/City.vue')
const Login = () => import('views/login/Login.vue')
const Profile = () => import('views/profile/Profile.vue')

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
  },
  // 当前选择城市页
  {
    path: '/city/:cityId',
    component: City
  },
  // 登录注册页
  {
    path: '/login',
    component: Login
  },
  // 个人信息页
  {
    path: '/profile',
    component: Profile
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router