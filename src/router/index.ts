import { createRouter, createWebHistory } from 'vue-router';
import useStore from '@/store';

import HomeView from '@/views/home/HomeView.vue';
import HomeIndexView from '@/views/home/HomeIndexView.vue';

import AccountView from '@/views/account/AccountView.vue';
import AccountIndexView from '@/views/account/AccountIndexView.vue';
import AccountLoginView from '@/views/account/AccountLoginView.vue';

import NoRouteView from "@/views/NoRouteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'homeIndex',
          component: HomeIndexView
        },
        {
          path: ':pathMatch(.*)*',
          name: 'homePageNotFound',
          component: NoRouteView
        }
      ]
    },
    {
      path: '/account',
      component: AccountView,
      children: [
        {
          path: 'login',
          name: 'accountLogin',
          component: AccountLoginView
        },
        {
          path: '/',
          name: 'account',
          component: AccountIndexView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: NoRouteView
    }
  ]
})

// account navigation guard
router.beforeEach((to, from, next) => {
  const store = useStore();

  if(to.path === '/account' || to.name === 'account') {
    if(store.isAuthenticated) {
      next();
    } else {
      next({ 
        name: "accountLogin",
        query: {
          redirect: 'true'
        }
      });
    }
  } else {
    next();
  }
});

// accountLogin navigation guard
router.beforeEach((to, from, next) => {
  const store = useStore();

  if(to.path === '/account/login' || to.name === 'accountLogin') {
    if(store.isAuthenticated) {
      next({ name: "account" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
