<template>
  <div 
    class="notice min-h-fit w-[80%] mt-2 mb-2 p-2 flex justify-center items-center rounded-md text-white text-lg text-center"
    :class="{
      'bg-yellow-600': level === 'warn',
      'bg-red-600': level === 'error',
      'bg-cyan-dark': level === 'info',
      'bg-green': level === 'success'
    }"
  >
    <font-awesome-icon v-if="icon !== undefined" :icon="icon" />
    <h1 
      class="text-lg text-center h-full flex justify-center items-center"
      :class="{
        'ml-4': icon !== undefined
      }"
    >{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    message: string;
    level: "info" | "success" | "warn" | "error";
    icon?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    message: "No message specified!",
    level: "warn",
    icon: undefined
  });
</script>