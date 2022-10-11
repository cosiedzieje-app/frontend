<template>
  <CustomButton 
    :props="item"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from "../types";
import CustomButton from "./CustomButton.vue";

// See https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
interface Props {
  item: ButtonProps
}

const props = defineProps<Props>();
</script>