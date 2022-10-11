<template>
  <RouteWrapper class="grid grid-rows-2">
    <NavBar :items="navbarItems" />
  </RouteWrapper>
</template>

<script setup lang="ts">
import router from "@/router";
import RouteWrapper from "../components/RouteWrapper.vue";
import type { ButtonProps } from "../types";
import NavBar from "../components/NavBar.vue";

const navbarItems: ButtonProps[] = [
  {
    caption: "Home",
    action: () => router.push("/"),
    icon: "fa-solid fa-house"
  },
  {
    caption: "My pins",
    action: () => router.push("/my-pins"),
    icon: "fa-solid fa-location-pin"
  },
  {
    caption: "About",
    action: () => router.push("/about"),
    icon: "fa-solid fa-circle-info"
  }
];
</script>