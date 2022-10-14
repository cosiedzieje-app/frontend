<template>
  <FormInput 
    name="address"
    type="text"
    :modelValue="modelValue"
    @update:model-value="updateValue"
    :autocomplete="autocomplete !== undefined ? autocomplete : 'off'"
    :placeholder="placeholder !== undefined ? placeholder : 'Twój adres'"
    :not-rounded="true"
    custom-border="border-0 border-b-2"
    custom-border-color="border-green"
    custom-text-align="text-center"
    @enter="onEnter"
    :enabled="enabled"
  />
</template>

<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';

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
</script>