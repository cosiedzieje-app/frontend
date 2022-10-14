<template>
  <div
    class="flex flex-col justify-center items-center my-2"
  >
    <label class="text-white" :for="name">{{ labelContent }}</label>
    <input 
      class="text-white bg-gray-dark py-2 px-4 w-full border-2 border-solid border-white focus:border-green rounded"
      :value="modelValue" 
      @input="updateValue" 
      :id="name" 
      :name="name" 
      :type="type" 
      :autocomplete="autocomplete" 
      required
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  labelContent: string;
  type: string;
  name: string;
  autocomplete?: string;
  modelValue: string;
}

const emit = defineEmits(['update:modelValue']);
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};

const props = defineProps<Props>();
</script>