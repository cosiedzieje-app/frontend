<template>
  <CustomButton 
    class="w-full"
    :props="buttonProps"
  />
</template>

<script setup lang="ts">
import CustomButton from "@/components/general/CustomButton.vue";
import type { ButtonProps } from "@/types";
import { useRouter } from "vue-router";
import { ref, type Ref } from "vue";
import useStore from '@/store';

const store = useStore();
const router = useRouter();
const buttonProps: Ref<ButtonProps> = ref({
  caption: (store.isAuthenticated && store.getUserData !== null) ? store.getUserData.loginName : "Zaloguj się",
  action: () => store.isAuthenticated ? router.push('/account') : router.push('/account/login'),
  icon: store.isAuthenticated ? "fa-solid fa-user" : "fa-solid fa-key",
  mobile: true
} as ButtonProps);

store.$subscribe((_mut, state) => {
  buttonProps.value = {
    caption: (state.authenticated && state.userData !== null) ? state.userData.loginName : "Zaloguj się",
    action: () => state.authenticated ? router.push('/account') : router.push('/account/login'),
    icon: state.authenticated ? "fa-solid fa-user" : "fa-solid fa-key",
    mobile: true
  };
});
</script>
