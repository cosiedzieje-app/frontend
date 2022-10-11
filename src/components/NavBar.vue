<template>
  <nav class="w-full flex flex-row justify-center items-center">
    <NavBarItem 
      v-for="item in items"
      :key="item.caption"
      :item="item"
    />
  </nav>
</template>

<script setup lang="ts">
import type { ButtonProps } from "../types";
import NavBarItem from "./NavBarItem.vue";

interface Props {
  items: ButtonProps[];
}

const props = defineProps<Props>();
</script>