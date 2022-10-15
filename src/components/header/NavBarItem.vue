<template>
    <a 
      class="flex justify-center items-center text-gray-lighter hover:text-main-megalight transition-colors duration-400 min-w-[100px] min-h-[30px] px-4 py-2 cursor-pointer"
      @click="() => props.action()"
    >
      <!-- <font-awesome-icon class="h-[16px] w-[16px]" :icon="props.icon" /> -->
      <span class="text-center text-base flex flex-row justify-center items-center">{{ props.caption }}</span>
    </a>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/types";

interface Props {
  props: ButtonProps
}

const defProps = defineProps<Props>();
</script>
