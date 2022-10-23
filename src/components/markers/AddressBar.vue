<template>
  <form @submit.prevent="onEnter" class="flex flex-row justify-around md:mx-6 md:my-2">
    <FormInput 
      name="address"
      type="text"
      class="w-3/5"
      v-model="modelValue.address"
      :autocomplete="autocomplete !== undefined ? autocomplete : 'off'"
      :placeholder="placeholder !== undefined ? placeholder : 'Twój adres'"
      custom-text-align="text-center"
      :enabled="enabled"
      required
    />
    <select 
      v-model="modelValue.distance" 
      @change="onChange" 
      class="text-white text-center bg-gray w-1/5 md:py-2 md:px-4 md:ml-4 border-solid border-gray-400 md:rounded focus:border-main" 
      :enabled="enabled"
      required
    >
      <option value="0">Miejscowość</option>
      <option value="1">1 km</option>
      <option value="1">2 km</option>
      <option value="3">3 km</option>
      <option value="5">5 km</option>
      <option value="10">10 km</option>
      <option value="15">15 km</option>
      <option value="20">20 km</option>
      <option value="30">30 km</option>
      <option value="50">50 km</option>
    </select>
    <button
      type="submit"
      class="flex w-1/5 md:w-auto flex-row justify-center items-center text-center bg-main hover:bg-main-light duration-200 md:rounded-xl text-white py-4 md:py-0 px-4 md:ml-4"
      :enabled="enabled"
    >
      <font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-magnifying-glass"/>
    </button>
  </form>

</template>

<script setup lang="ts">
import FormInput from '@/components/general/FormInput.vue';
import { ref } from 'vue';
import type { AddressBarValue } from '@/types';

interface Props {
  modelValue: AddressBarValue;
  enabled: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'enter']);
const onEnter = () => emit('enter');

const placeholder = ref('Nazwa miejscowości');
const autocomplete = ref('street-address');
const onChange = () => {
  if(props.modelValue.distance === '0') {
    placeholder.value = 'Nazwa miejscowości';
    autocomplete.value = 'address-level2';
  } else {
    placeholder.value = 'Twój adres';
    autocomplete.value = 'street-address';
  }
}
</script>
