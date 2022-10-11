<template>
  <button 
    class="bg-purple rounded-md flex flex-row justify-center items-center text-center text-white min-w-[100px] p-2 m-2 hover:bg-purple-light transition-[background-color] duration-200"
    @click="() => props.action()"
  >
    <font-awesome-icon class="h-[20px] w-[20px]" :icon="props.icon" />
    <span class="text-center ml-4 text-base">{{ props.caption }}</span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "../types";

// See https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
interface Props {
  props: ButtonProps
}

// Avoid name collision
const defProps = defineProps<Props>();
</script>