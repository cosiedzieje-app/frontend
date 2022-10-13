<template>
  <header class="flex flex-row h-full w-full outline-none border-solid border-0 border-b-2 border-green">
    <span
      class="h-full text-center text-green hover:text-green-light transition-[color] duration-200 hover:cursor-pointer p-4 flex flex-col justify-center items-center text-4xl font-bold"
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
    caption: "Dodaj ogłoszenie",
    action: () => router.push("/add"),
    icon: "fa-solid fa-location-pin"
  }
];
</script>