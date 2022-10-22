<template>
  <RouteWrapper class="account-index-route-wrapper" :scrollable="false">
    <AccountSidebar
      class="account-sidebar"
    />
    <div
      class="account-wrapper w-full h-full"
    >
      <router-view v-slot="{ Component }">
        <transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from '@/components/general/RouteWrapper.vue';
import AccountSidebar from "@/components/account/AccountSidebar.vue";
import useStore from "@/store";
import { useRouter } from "vue-router";
import type { UserData } from "@/types";

const router = useRouter();
const store = useStore();
const userData = store.getUserData as UserData;
</script>

<style scoped lang="scss">
.account-index-route-wrapper {
  display: grid;
  
  @media screen and (max-width: 767px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "sidebar"
      "main";
  }
  @media screen and (min-width: 768px) {
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas: "sidebar main";
  }
}
.account-sidebar {
  grid-area: sidebar;    
}
.account-wrapper {
  grid-area: main;
}
</style>
