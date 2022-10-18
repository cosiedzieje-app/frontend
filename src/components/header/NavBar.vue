<template>
  <nav class="navbar w-full">
    <div class="border-main flex justify-end items-center p-2">
      <NavBarItem 
        v-for="item in items"
        :key="item.caption"
        :props="item"
      />
      <AccountBox 
        class="ml-4"
        :name="(authenticated && userData !== null) ? userData.loginName : null"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { ButtonProps, UserData } from "@/types";
import NavBarItem from "./NavBarItem.vue";
import AccountBox from "./AccountBox.vue";
import useStore from "@/store";

const store = useStore();
const userData: UserData | null = store.getUserData;
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
