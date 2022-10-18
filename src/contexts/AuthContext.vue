<template>
  <slot></slot>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { provide } from "vue";
import type { LoginData, UserData, NewAccount, AuthContext } from "@/types";
import * as userApi from "@/api/user";

const store = useStore();

/**
* Logs user in
*
* @throws See @/api/user.ts
*/
async function login(loginData: LoginData): Promise<void> {
  return userApi.login(loginData)
    .then(() => userApi.getUserData())
    .then((data: UserData) => {
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

provide<AuthContext>("authContext", {
  login,
  logout,
  register
});
</script>
