<template>
  <div
    class="w-full bg-gray-light flex flex-row items-center justify-center rounded-md text-xl md:text-2xl text-white p-4 my-2"
  >
    <span
      class="h-full flex justify-center items-center font-bold mr-4"
    >
      {{ label }}
    </span>
    <span
      class="h-full flex justify-center items-center"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string;
}

const props = defineProps<Props>();
</script>
