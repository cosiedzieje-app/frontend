<template>
  <div
    class="flex flex-col justify-center items-center"
  >
    <label 
      v-if="labelContent !== undefined"
      class="text-white" 
      :for="name"
    >
      {{ labelContent }}
    </label>
    <input 
      class="text-white bg-gray-dark py-2 px-4 w-full border-solid"
      :class="{
        rounded: notRounded !== true,
        'border-2': customBorder === undefined,
        [customBorder as string]: customBorder !== undefined,
        'border-white': customBorderColor === undefined,
        [customBorderColor as string]: customBorder !== undefined,
        'focus:border-green': customFocusBorderColor === undefined,
        [customFocusBorderColor as string]: customFocusBorderColor !== undefined,
        [customTextAlign as string]: customTextAlign !== undefined
      }"
      :value="modelValue" 
      @input="updateValue"
      @keydown="keyDown" 
      :id="name" 
      :name="name" 
      :type="type" 
      :autocomplete="autocomplete" 
      :placeholder="placeholder"
      required
      :disabled="!enabled"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  labelContent?: string;
  type: string;
  name: string;
  autocomplete?: string;
  modelValue: string;
  placeholder?: string;
  notRounded?: boolean;
  customBorder?: string;
  customBorderColor?: string;
  customFocusBorderColor?: string;
  customTextAlign?: string;
  enabled: boolean;
}


const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'enter']);
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
const keyDown = (e: KeyboardEvent) => {
  if(e.isComposing || e.keyCode === 229) {
    //ignore since this is IME event 
    //(see: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
    return;
  }

  if(e.key === 'Enter') {
    emit('enter');
  }
}
</script>