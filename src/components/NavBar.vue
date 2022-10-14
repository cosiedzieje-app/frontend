<template>
  <nav class="navbar w-full">
    <div class="w-full flex flex-col md:flex-row justify-center items-center">
      <NavBarItem 
        v-for="item in items"
        :key="item.caption"
        :item="item"
      />
    </div>
    <div class="mt-5 border-dashed border-0 border-t md:border-0 border-green md:mt-0 flex justify-center items-center p-4">
      <AccountBox 
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

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
  }
}
</style>