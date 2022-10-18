<template>
  <header 
    class="flex flex-row h-full w-full outline-none border-solid border-0 border-b border-[#454545] px-6"
  >
    <span
      class="text-center text-main-light hover:text-main-superlight transition-colors duration-200 cursor-pointer p-2 flex flex-col justify-center items-center text-3xl font-bold"
      @click="() => router.push('/')"
    >
      Somsiad
    </span>
    <NavBar :items="navbarItems"/>
  </header>
</template>

<script setup lang="ts">
import NavBar from "./NavBar.vue";
import type { ButtonProps } from "@/types";
import { useRouter } from "vue-router";
import useStore from '@/store';
import { ref, type Ref, onMounted } from 'vue';

const router = useRouter();
const store = useStore();
const baseNavbarItems: ButtonProps[] = [
  {
    caption: "Ogłoszenia",
    action: () => router.push("/markers"),
    icon: "fa-solid fa-location-dot"
  },
  {
    caption: "Załóż konto",
    action: () => router.push("/account/register"),
    icon: ""
  }
];

const navbarItems: Ref<ButtonProps[]> = ref([]);

onMounted(() => {
  if(store.isAuthenticated === true) {
    navbarItems.value = [ 
      ...baseNavbarItems,
      {
        caption: "Dodaj ogłoszenie",
        action: () => router.push({ name: 'markersAdd' }),
        icon: "fa-solid fa-map-pin"
      }
    ]; 
  } else {
    navbarItems.value = [ ...baseNavbarItems ];
  }
});

store.$subscribe((mutation, state) => {
  if(state.authenticated === true) {
    navbarItems.value = [ 
      ...baseNavbarItems,
      {
        caption: "Dodaj ogłoszenie",
        action: () => router.push({ name: 'markersAdd' }),
        icon: "fa-solid fa-map-pin"
      }
    ]; 
  } else {
    navbarItems.value = [ ...baseNavbarItems ];
  }
});
</script>
