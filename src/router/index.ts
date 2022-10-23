import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized, RouteLocationRaw } from "vue-router";
import * as userApi from "@/api/user";

import useStore from '@/store';

import HomeView from '@/views/home/HomeView.vue';
import HomeIndexView from '@/views/home/HomeIndexView.vue';

import MarkersView from '@/views/markers/MarkersView.vue';
import MarkersIndexView from '@/views/markers/MarkersIndexView.vue';
import MarkersAddView from '@/views/markers/MarkersAddView.vue';
import MarkersExplorer from '@/views/markers/MarkersExplorer.vue';
import MarkersExplorerDetails from '@/views/markers/MarkersExplorerDetails.vue';

import AccountView from '@/views/account/AccountView.vue';
import AccountIndexView from '@/views/account/AccountIndexView.vue';
import AccountIndexOverviewView from '@/views/account/AccountIndexOverviewView.vue';
import AccountIndexMarkersManagementView from '@/views/account/AccountIndexMarkersManagementView.vue';
import AccountIndexPasswordChangeView from '@/views/account/AccountIndexPasswordChangeView.vue';
import AccountIndexVerificationView from '@/views/account/AccountIndexVerificationView.vue';
import AccountLoginView from '@/views/account/AccountLoginView.vue';
import AccountLogoutView from '@/views/account/AccountLogoutView.vue';
import AccountRegisterView from '@/views/account/AccountRegisterView.vue';

import NoRouteView from "@/views/NoRouteView.vue";

declare module 'vue-router' {
  interface RouteMeta {
    authRedirect?: RouteLocationRaw;
  } 
}

// authorization navigation guard
async function requiresAuth() {
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

function checkExploredMarkers() {
  const store = useStore();
  if(!store.exploredMarkers) {
    return { 
      name: 'markers',
    };
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
          path: 'explorer',
          name: 'markersExplore',
          component: MarkersExplorer,
          beforeEnter: [ checkExploredMarkers ],
          children: [
            {
              path: 'details',
              name: 'markersExploreDetails',
              component: MarkersExplorerDetails,
            }
          ]
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
          beforeEnter: [ requiresAuth ],
          children: [
            {
              path: '',
              name: 'accountIndexOverview',
              component: AccountIndexOverviewView,
              beforeEnter: [ requiresAuth ]
            },
            {
              path: 'markersManagement',
              name: 'accountIndexMarkersManagement',
              component: AccountIndexMarkersManagementView,
              beforeEnter: [ requiresAuth ]
            },
            {
              path: 'passwordChange',
              name: 'accountIndexPasswordChange',
              component: AccountIndexPasswordChangeView,
              beforeEnter: [ requiresAuth ]
            },
            {
              path: 'verification',
              name: 'accountIndexVerification',
              component: AccountIndexVerificationView,
              beforeEnter: [ requiresAuth ]
            }
          ]
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
          path: 'logout',
          name: 'accountLogout',
          component: AccountLogoutView,
          beforeEnter: [ requiresAuth ]
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

router.beforeEach(async (to, from, next) => {
  const store = useStore();

  if(store.isAuthenticated === false) {
    await userApi.isLoggedIn()
      .then(async () => {
        //console.log("Successfully logged in user");
        store.setAuthenticated(true);
        return await userApi.getUserData()
          .then(data => {
            //console.log("Successfully fetched user data!");
            store.setUserData(data);
            //console.log("Successfully applied user data!");
            next();
          })
          .catch(async err => {
            console.error(err);
            return await userApi.logout()
              .then(() => {
                //console.log("Successfully logged out");
                store.setAuthenticated(false);
                store.clearUserData();
                next();
              })
              .catch(err => {
                //console.error(`Could not log out: ${err}`);
                store.setAuthenticated(false);
                store.clearUserData();
                next();
              });
          });
      })
      .catch(() => {
        //console.log("User is not logged in.")
        store.setAuthenticated(false);
        store.clearUserData();
        next();
      })
  } else {
    //console.log("User already logged in");
    if(store.getUserData === null) {
      await userApi.getUserData()
        .then(data => {
          //console.log("Successfully fetched user data!");
          store.setUserData(data);
          //console.log("Successfully applied user data!");
          next();
        })
        .catch(async err => {
          console.error(err);
          return await userApi.logout()
            .then(() => {
              //console.log("Successfully logged out");
              store.setAuthenticated(false);
              store.clearUserData();
              next();
            })
            .catch(err => {
              //console.error(`Could not log out: ${err}`);
              store.setAuthenticated(false);
              store.clearUserData();
              next();
            });
        });
    } else {
      //console.log("User data already cached");
      next();
    }
  }
});

export default router;
