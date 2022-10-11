import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import NoRouteView from "../views/NoRouteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: NoRouteView
    }
  ]
})

export default router
