<template>
  <header 
    class="flex flex-col md:flex-row h-full w-full outline-none border-solid border-0 border-b border-[#454545] md:px-6"
  >
    <span
      class="w-full min-w-0 md:w-auto md:min-w-[200px] text-center text-main-light hover:text-main-superlight transition-colors duration-200 cursor-pointer p-2 md:p-0 flex flex-col justify-center items-center text-4xl md:text-3xl font-bold"
      @click="() => router.push('/')"
    >
      CoSięDzieje
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
     caption: "Kod źródłowy",
     action: () => window.open("https://github.com/cosiedzieje-app"),
     icon: "fa-brands fa-github"
   },
   {
     caption: "Ogłoszenia",
     action: () => router.push("/markers"),
     icon: "fa-solid fa-location-dot"
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
       },
       {
         caption: "Wyloguj się",
         action: () => router.replace({ name: "accountLogout" }),
         icon: "fa-solid fa-key"
       }
     ]; 
   } else {
     navbarItems.value = [ 
       ...baseNavbarItems, 
       {
         caption: "Załóż konto",
         action: () => router.push("/account/register"),
         icon: ""
       }
     ];
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
       },
       {
         caption: "Wyloguj się",
         action: () => router.replace({ name: "accountLogout" }),
         icon: "fa-solid fa-key"
       }
     ]; 
   } else {
     navbarItems.value = [ 
       ...baseNavbarItems,
       {
         caption: "Załóż konto",
         action: () => router.push("/account/register"),
         icon: ""
       }
     ];
   }
 });
</script>
