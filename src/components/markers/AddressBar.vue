<template>
  <form @submit.prevent="onEnter" class="flex flex-row justify-around mx-6 my-2">
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
      required
    />
    <select 
      v-model="distance" 
      @change="onChange" 
      class="text-white bg-gray py-2 px-4 w-2/7 border-solid border-gray-400 rounded focus:border-main" 
      :enabled="enabled"
      required
    >
      <option value="0">0 km</option>
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
      class="flex flex-row justify-center items-center text-center bg-main hover:bg-main-light duration-200 rounded-xl text-white px-4"
      :enabled="enabled"
    >
      <font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-magnifying-glass"/>
    </button>
  </form>

</template>

<script setup lang="ts">
import FormInput from '@/components/general/FormInput.vue';
import { ref } from '@vue/reactivity';

interface Props {
  modelValue: string;
  distance: string;
  enabled: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'enter']);
const updateValue = (v: string) => {
  emit('update:modelValue', v);
}
const onEnter = () => emit('enter');

const placeholder = ref('Twój adres');
const autocomplete = ref('street-address');
const onChange = () => {
  if(props.distance === '0') {
    placeholder.value = 'Nazwa miejscowości';
    autocomplete.value = 'address-level2';
  } else {
    placeholder.value = 'Twój adres';
    autocomplete.value = 'street-address';
  }
}
</script>