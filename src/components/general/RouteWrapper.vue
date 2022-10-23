<template>
  <div 
    ref="wrapper"
    class="h-full w-full"
    :class="{
      'overflow-auto': props.scrollable
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

interface Props {
  scrollable?: boolean; 
}

const wrapper: Ref<HTMLDivElement | null> = ref(null);

const props = withDefaults(defineProps<Props>(), {
  scrollable: false
});

defineExpose({
  wrapper
});
</script>
