<template>
  <button 
    class="flex flex-row justify-center items-center text-center bg-main rounded-xl  text-white min-w-[100px] min-h-[30px] px-4 py-2"
    @click="() => props.action()"
  >
    <!-- <font-awesome-icon class="h-[20px] w-[20px]" :icon="props.icon" /> -->
    <span class="text-center">{{ props.caption }}</span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/types";

interface Props {
  props: ButtonProps
}

const defProps = defineProps<Props>();
</script>