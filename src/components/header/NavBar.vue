<template>
  <nav class="navbar w-full">
    <div class="border-main flex flex-col md:flex-row md:justify-end items-center md:p-2">
      <NavBarItem 
        v-for="item in items"
        :key="item.caption"
        :props="item"
      />
      <AccountBox 
        class="md:ml-4"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/types";
import NavBarItem from "./NavBarItem.vue";
import AccountBox from "./AccountBox.vue";

interface Props {
  items: ButtonProps[];
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
}
</style>
