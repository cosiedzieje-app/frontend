<template>
  <button 
    class="flex flex-row justify-center items-center text-center duration-200 text-xl md:text-base md:rounded-xl text-white min-h-[30px] px-4 py-2"
    @click="() => onClick()"
    :class="{
      'min-w-[100px]': !props.mobile,
      'md:min-w-[100px]': props.mobile,
      'bg-main': props.enabled !== false,
      'hover:bg-main-light': props.enabled !== false,
      'bg-main-dark': props.enabled === false,
    }"
    type="button"
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
  } else {
    if(defProps.props.disabledAction !== undefined)
      defProps.props.disabledAction();
  }
}
</script>
