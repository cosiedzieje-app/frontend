<template>
  <button
    class="flex flex-[1_1_auto] flex-row justify-center items-center text-center text-2xl text-white transition-[background-color] duration-150 w-full p-4"
    :class="{
      'bg-main': props.currentCondition,
      'hover:bg-main-light': props.currentCondition,
      'bg-gray-light': !props.currentCondition,
      'hover:bg-gray-lighter': !props.currentCondition
    }"
    type="button"
    autocomplete="off"
    @click="() => props.action()"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import type { AccountSidebarItemProps } from '@/types';

interface Props {
  props: AccountSidebarItemProps;
}

const defProps = defineProps<Props>();
</script>
