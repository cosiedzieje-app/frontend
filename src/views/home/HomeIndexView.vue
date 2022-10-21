<template>
    <div class="flex flex-col justify-center items-center">
        <section class="flex flex-col justify-center items-center m-36 w-[80%] text-center">
            <h1 class="text-6xl p-2 whitespace-nowrap font-bold text-white">Pomoc sąsiedzka w zasięgu ręki!</h1>
            <p class="text-xl text-gray-lighter my-2 w-[65%]">Innowacyjna platforma zacieśniająca więzi międzyludzkie. Sprawdzaj i dodawaj ogłoszenia w swojej okolicy. Oferuj pomoc, organizuj imprezy masowe i wiele więcej!</p>
            <div class="flex flex-row">
                <CustomButton class="m-2 text-lg" v-for="button in buttons" :props="button" />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/general/CustomButton.vue";
import type { ButtonProps } from "@/types";
import router from "@/router";
import { reactive, ref, type Ref } from "vue";
import useStore from '@/store';

const store = useStore();
const registerButton: Ref<ButtonProps> = store.isAuthenticated ? ref({
  caption: "Moje konto",
  action: () => router.push("/account"),
  icon: ''
}) : ref({
  caption: "Załóż konto",
  action: () => router.push('/account/register'),
  icon: ''
});

store.$subscribe((mut, state) => {
  if(state.authenticated) {
    registerButton.value = {
      caption: "Moje konto",
      action: () => router.push("/account"),
      icon: ''
    };
  } else {
    registerButton.value = {
      caption: "Załóż konto",
      action: () => router.push('/account/register'),
      icon: ''
    };
  }  
})

const buttons: Ref<ButtonProps[]> = ref([
    registerButton.value,
    {
        caption: 'Zobacz ogłoszenia',
        action: () => router.push('/markers'),
        icon: ''
    }
])
</script>
