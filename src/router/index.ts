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

// navigation guard
router.beforeEach((to, from) => {
  const store = useStore();

  function checkMatched(path: string): boolean {
    if(to.matched.length > 0) {
      if(to.matched.find(v => v.path === path) !== undefined)
        return true;
      else
        return false;
    } else return false;
  }

  //console.log(to.path);
  //console.log(JSON.stringify(to.matched, null, 4));

  if(checkMatched("/account/login") || to.name === 'accountLogin') {
    //console.log("accountLogin matched");
    if(store.isAuthenticated) {
      return { name: "account" };
    }
  } else if(checkMatched("/account") || to.name === 'account') {
    //console.log("account matched");
    if(!store.isAuthenticated) {
      return { 
        name: "accountLogin",
        query: {
          redirect: 'true'
        }
      };
    }
  }
});

export default router;
