<template>
  <CustomButton 
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
  caption: "Zaloguj się",
  action: () => router.push('/account/login'),
  icon: "fa-solid fa-key"
} as ButtonProps);

store.$subscribe((mut, state) => {
  buttonProps.value = {
    caption: (state.authenticated && state.userData !== null) ? state.userData.loginName : "Zaloguj się",
    action: () => state.authenticated ? router.push('/account') : router.push('/account/login'),
    icon: state.authenticated ? "fa-solid fa-user" : "fa-solid fa-key"
  };
});
</script>
