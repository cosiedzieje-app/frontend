import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteLocationRaw } from 'vue-router';

import useStore from '@/store';

import HomeView from '@/views/home/HomeView.vue';
import HomeIndexView from '@/views/home/HomeIndexView.vue';

import MarkersView from '@/views/markers/MarkersView.vue';
import MarkersIndexView from '@/views/markers/MarkersIndexView.vue';
import MarkersAddView from '@/views/markers/MarkersAddView.vue';
import MarkersListingView from '@/views/markers/MarkersListingView.vue';

import AccountView from '@/views/account/AccountView.vue';
import AccountIndexView from '@/views/account/AccountIndexView.vue';
import AccountLoginView from '@/views/account/AccountLoginView.vue';
import AccountRegisterView from '@/views/account/AccountRegisterView.vue';

import NoRouteView from "@/views/NoRouteView.vue";

declare module 'vue-router' {
  interface RouteMeta {
    authRedirect?: RouteLocationRaw;
  } 
}

// authorization navigation guard
function requiresAuth() {
  const store = useStore();

  //console.log('route requires authorization');
  if(!store.isAuthenticated) {
    //console.log('user not authorized - redirecting');
    return { 
      name: 'accountLogin', 
      query: { 
        redirect: 'true' 
      } 
    };
  }
}

// navigation guard in cases where
// user has NOT to be authorized
// to access route (e.g. login, register etc.)
function authRedirect(to: RouteLocationNormalized) {
  const store = useStore();

  //console.log('route requires user NOT to be authorized');
  if(store.isAuthenticated) {
    //console.log('user IS authorized - redirecting');
    if(to.meta.authRedirect !== undefined) {
      return to.meta.authRedirect;
    } else {
      console.error('authRedirect meta is not set! Redirecting to home...');
      return { name: 'home' };
    }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeIndexView
        }
      ]
    },
    {
      path: '/markers',
      component: MarkersView,
      children: [
        {
          path: '',
          name: 'markers',
          component: MarkersIndexView
        },
        {
          path: 'add',
          name: 'markersAdd',
          component: MarkersAddView,
          beforeEnter: [ requiresAuth ]
        },
        {
          path: 'listing/:id',
          name: 'markersListing',
          component: MarkersListingView
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
          path: '',
          name: 'account',
          component: AccountIndexView,
          beforeEnter: [ requiresAuth ]
        },
        {
          path: 'login',
          name: 'accountLogin',
          component: AccountLoginView,
          beforeEnter: [ authRedirect ],
          meta: {
            authRedirect: { name: "account" }
          }
        },
        {
          path: 'register',
          name: 'accountRegister',
          component: AccountRegisterView,
          props: true,
          beforeEnter: [ authRedirect ],
          meta: {
            authRedirect: { name: "account" }
          }
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

export default router;
