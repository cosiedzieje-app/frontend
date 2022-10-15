<template>
  <nav class="navbar w-full">
    <div class="border-green flex justify-end items-center p-2">
      <NavBarItem 
        v-for="item in items"
        :key="item.caption"
        :props="item"
      />
      <AccountBox 
        class="ml-4"
        :name="(authenticated) ? store.getAccountName : null"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { ButtonProps } from "../types";
import NavBarItem from "./NavBarItem.vue";
import AccountBox from "@/components/AccountBox.vue";
import useStore from "@/store";

const store = useStore();
const authenticated = store.isAuthenticated;

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

  // @media screen and (max-width: 767px) {
  //   grid-template-columns: 1fr;
  //   grid-template-rows: 1fr auto;
  // }
}
</style>