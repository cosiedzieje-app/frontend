<template>
  <CustomButton 
    :props="buttonProps"
  />
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import type { ButtonProps } from "@/types";
import router from "@/router";

interface Props {
  name: string | null;
}

const props = defineProps<Props>();
const buttonProps: ButtonProps = {
  caption: (props.name !== null) ? props.name : "Zaloguj/zarejestruj się",
  action: () => router.push("/account"),
  icon: (props.name !== null) ? "fa-solid fa-user" : "fa-solid fa-key"
};
</script>