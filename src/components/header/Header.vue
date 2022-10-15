<template>
  <header 
    class="flex flex-row h-full w-full outline-none border-solid border-0 border-b border-[#454545] px-6"
  >
    <span
      class="text-center text-main cursor-pointer p-2 flex flex-col justify-center items-center text-3xl font-bold"
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

const router = useRouter();
const navbarItems: ButtonProps[] = [
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
</script>