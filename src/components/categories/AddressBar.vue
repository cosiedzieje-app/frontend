<template>
  <div class="flex flex-row justify-around mx-6 my-2">
    <FormInput 
      name="address"
      type="text"
      class="w-3/5"
      :modelValue="modelValue"
      @update:model-value="updateValue"
      :autocomplete="autocomplete !== undefined ? autocomplete : 'off'"
      :placeholder="placeholder !== undefined ? placeholder : 'Twój adres'"
      custom-text-align="text-center"
      :enabled="enabled"
    />
    <select v-model="distance" @change="onChange" class="text-white bg-gray py-2 px-4 w-2/7 border-solid border-gray-400 rounded focus:border-main" name="" id="">
      <option value="0">0 km</option>
      <option value="1">1 km</option>
      <option value="3">3 km</option>
      <option value="5">5 km</option>
      <option value="10">10 km</option>
      <option value="20">20 km</option>
      <option value="30">30 km</option>
      <option value="50">50 km</option>
    </select>
    <button
      class="flex flex-row justify-center items-center text-center bg-main hover:bg-main-light duration-200 rounded-xl text-white px-4"
      @click="onEnter"
      ><font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-magnifying-glass"/></button>
  </div>

</template>

<script setup lang="ts">
import FormInput from '@/components/general/FormInput.vue';
import CustomButton from '@/components/general/CustomButton.vue';
import type { ButtonProps } from '@/types';
import { ref } from '@vue/reactivity';

interface Props {
  modelValue: string;
  enabled: boolean;
  placeholder?: string;
  autocomplete?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'enter']);
const updateValue = (v: string) => {
  emit('update:modelValue', v);
}
const onEnter = () => emit('enter');

const distance = ref('5');
const placeholder = ref('Twój adres');
const onChange = () => {
  if(distance.value === '0') placeholder.value = 'Nazwa miejscowości';
  else placeholder.value = 'Twój adres';
}
</script>