<template>
  <div 
    class="h-full w-full"
    :class="{
      'overflow-auto': props.scrollable
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    scrollable?: boolean; 
  }

  const props = withDefaults(defineProps<Props>(), {
    scrollable: false
  });
</script>