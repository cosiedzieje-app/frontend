<template>
  <nav class="w-full">
    <div class="border-main flex flex-col items-center md:h-full md:flex-row md:justify-end md:p-2">
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
