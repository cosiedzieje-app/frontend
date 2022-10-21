<template>
  <button 
    class="flex flex-row justify-center items-center text-center duration-200 rounded-xl text-white min-w-[100px] min-h-[30px] px-4 py-2"
    @click="() => onClick()"
    :class="{
      'bg-main': props.enabled !== false,
      'hover:bg-main-light': props.enabled !== false,
      'bg-green': props.enabled === false,
    }"
    :disabled="props.enabled === false"
    autocomplete="off"
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

const onClick = () => {
  if(defProps.props.enabled !== false) {
    defProps.props.action();
  }
}
</script>
