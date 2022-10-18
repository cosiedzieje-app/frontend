<template>
  <slot></slot>
</template>

<script setup lang="ts">
import useStore from "@/store";
import { provide } from "vue";
import type { LoginData, UserData, NewAccount, AuthContext } from "@/types";
import { login, logout, register, getUserData } from "@/api/user";

async function login(loginData: LoginData): Promise<void> {

}
async function logout(): Promise<void> {

}
async function register(registerData: NewAccount): Promise<void> {

}
async function getUserData(): Promise<UserData> {

}

provide<AuthContext>("authContext", {
  login,
  logout,
  register,
  getUserData
});

const store = useStore();
</script>
