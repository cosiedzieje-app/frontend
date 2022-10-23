<template>
  <div
    class="w-full flex flex-col justify-center items-center"
  >
    <button
      v-for="radio in radios"
      :key="radio.name"
      class="flex w-full justify-center items-center p-2 m-2 text-center text-white text-base rounded-md"
      :class="{
        'bg-main': radio.selected === true,
        'bg-gray-light': radio.selected === false
      }"
      @click="() => onClick(radio.name)"
      type="button"
    >
      {{ radio.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { FormRadioProps } from "@/types";
import { ref, type Ref } from 'vue';

interface Props {
  radios: FormRadioProps[]
}

const emit = defineEmits(["update"]);
const defProps = defineProps<Props>();

const radios: Ref<FormRadioProps[]> = ref([...defProps.radios]);

const onClick = (name: string) => {
  radios.value = radios.value.map((v: FormRadioProps) => {
    if(v.name === name) {
      v.selected = true;
    } else {
      v.selected = false;   
    }

    return v;
  });
  emit("update", name);
}
</script>
