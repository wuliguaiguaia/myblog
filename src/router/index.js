import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const home = () => import(/* webpackChunkName: "home" */ '@/views/home/Index')
const admin = () => import(/* webpackChunkName: "admin" */ '@/views/admin/Index')
const blog = () => import(/* webpackChunkName: "blog" */ '@/views/blog/Index')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login/Index')

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: home,
      name: 'home'
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
