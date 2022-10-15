<template>
  <CustomButton 
    :props="buttonProps"
  />
</template>

<script setup lang="ts">
import CustomButton from "@/components/general/CustomButton.vue";
import type { ButtonProps } from "@/types";
import { useRouter } from "vue-router";

interface Props {
  name: string | null;
}

const router = useRouter();
const props = defineProps<Props>();
const buttonProps: ButtonProps = {
  caption: (props.name !== null) ? props.name : "Zaloguj się",
  action: () => { 
    if(props.name !== null) {
      router.push("/account")
    } else {
      router.push("/account/login");
    }
  },
  icon: (props.name !== null) ? "fa-solid fa-user" : "fa-solid fa-key"
};
</script>