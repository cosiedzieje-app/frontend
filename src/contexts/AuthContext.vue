<template>
  <transition name="auth-fade" mode="out-in">
    <main
      v-if="loginCheck === false"
      class="w-full h-full flex flex-col justify-center items-center bg-gray"
    >
      <font-awesome-icon 
        class="text-center text-6xl mb-4 text-white"
        icon="fa-solid fa-key"
        fade
      />
      <h1
        class="w-full text-center text-white text-4xl"
      >Weryfikowanie logowania...</h1>
    </main>
    <slot v-else></slot>
  </transition>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { provide, ref, type Ref, onMounted } from "vue";
import type { LoginData, UserData, NewAccount, AuthContext } from "@/types";
import * as userApi from "@/api/user";

const store = useStore();
const loginCheck: Ref<boolean> = ref(false);

/**
* Gets user data from database and applies it to store
*
* @throws SomiadStatus on API error, null on fetch error
*/
async function applyUserData(): Promise<void> {
  return userApi.getUserData()
    .then(userData => {
      console.log("Successfully fetched user data!");
      store.setUserData(userData);
    })
    .catch(err => Promise.reject(err));
}

/**
* Logs user in
*
* @throws See @/api/user.ts
*/
async function login(loginData: LoginData): Promise<void> {
  return userApi.login(loginData)
    .then(() => { 
      console.log("Successfully logged in");
      return userApi.getUserData();
    })
    .then((data: UserData) => {
      console.log("Successfully fetched user data!");
      store.setUserData(data);
      store.setAuthenticated(true);
    })
    .catch(err => Promise.reject(err));
}

/**
* Logs user out
*
* @throws See @/api/user.ts
*/
async function logout(): Promise<void> {
  return userApi.logout()
    .then(() => {
      console.log("Successfully logged out");
      store.clearUserData();
      store.setAuthenticated(false);
    })
    .catch(err => Promise.reject(err));
}

/**
* Registers new account and automatically logs user in after successful
* registration
*
* NOTICE: Error may be thrown after successful registration due to login
* failure
*
* @param registerData {NewAccount} New account's register data
* @throws See @/api/user.ts
*/
async function register(registerData: NewAccount): Promise<void> {
  return userApi.register(registerData)
    .then(() => {
      console.log("Successfully registered account");
      const loginData: LoginData = {
        email: registerData.login.email,
        password: registerData.login.password
      };

      return login(loginData);
    })
    .catch(err => {
      store.clearUserData();
      store.setAuthenticated(false);
      return Promise.reject(err);
    });
}

/**
* Checks if user is logged in
*
* @throws SomsiadStatus if user is not logged in or on API error,
* null on fetch error
*/
async function isLoggedIn(): Promise<void> {
  return userApi.isLoggedIn();
}

provide<AuthContext>("authContext", {
  login,
  logout,
  register,
  isLoggedIn,
  applyUserData
});

onMounted(() => {
  if(store.isAuthenticated === false) {
    isLoggedIn()
      .then(() => { 
        store.setAuthenticated(true);
        return applyUserData()
          .then(() => { 
            console.log("Successfully applied user data.");
            loginCheck.value = true;
          })
          .catch(err => {
            console.error(err);
            return logout()
              .then(() => {
                loginCheck.value = true;
              })
              .catch(err => {
                  console.error(`Could not log out: ${err}`);
                  store.setAuthenticated(false);
                  store.clearUserData();
                  loginCheck.value = true;
              });
          });
      })
      .catch(err => {
        console.log("User is not logged in.");
        store.clearUserData();
        store.setAuthenticated(false);
        loginCheck.value = true;
      });
  } else {
    loginCheck.value = true;
  }
});
</script>

<style scoped lang="scss">
.auth-fade {
  &-enter-active, &-leave-active {
    transition: opacity .2s;
  }
  &-enter-from, &-leave-to {
    opacity: 0;
  }
  &-enter-to, &-leave-from {
    opacity: 1;
  }
}
</style>
