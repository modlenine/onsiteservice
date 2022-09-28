import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Add from '@/views/Add.vue'
import Viewdata from '@/views/Viewdata.vue'
import Service from '@/views/Service.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/addData',
    name: 'Add',
    component: Add
  },
  {
    path:'/viewdata/:id',
    name:'Viewdata',
    component:Viewdata
  },
  {
    path: '/service_type',
    name: 'Service',
    component: Service
  },
  // {
  //   path: '/list',
  //   name: 'List',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/List.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
