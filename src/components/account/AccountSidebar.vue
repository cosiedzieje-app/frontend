<template>
  <nav
    class="w-full md:w-[250px] md:h-full flex flex-col items-center border-0 border-black border-solid border-r-4"
  >
    <AccountSidebarItem
      v-for="item in items"
      :key="item.name"
      :props="item"
    />
  </nav>
</template>

<script setup lang="ts">
import AccountSidebarItem from "@/components/account/AccountSidebarItem.vue";
import type { AccountSidebarItemProps } from "@/types";
import type { Ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { ref, watch, watchPostEffect } from "vue";

const router = useRouter();
const route = useRoute();

const items: Ref<AccountSidebarItemProps[]> = ref([]);

watchPostEffect(() => {
  items.value = [
    {
      name: "overview",
      label: "Informacje",
      action: () => router.push({ name: "accountIndexOverview" }),
      currentCondition: route.name === "accountIndexOverview"
    },
    {
      name: "markersManagement",
      label: "Zarządzanie ogłoszeniami",
      action: () => router.push({ name: "accountIndexMarkersManagement" }),
      currentCondition: route.name === "accountIndexMarkersManagement"
    },
    {
      name: "passwordChange",
      label: "Zmiana hasła",
      action: () => router.push({ name: "accountIndexPasswordChange" }),
      currentCondition: route.name === "accountIndexPasswordChange"
    },
    {
      name: "verification",
      label: "Weryfikacja konta",
      action: () => router.push({ name: "accountIndexVerification" }),
      currentCondition: route.name === "accountIndexVerification"
    }
  ];
});
</script>
