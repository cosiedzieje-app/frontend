<template>
  <RouteWrapper class="flex flex-col justify-center items-center text-5xl text-white">
    <font-awesome-icon class="text-8xl text-red-600" icon="fa-solid fa-triangle-exclamation" fixed-width />
    <h1 class="p-4">Nie znaleziono strony!</h1>
    <CustomButton 
      :props="returnBtn"
    />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "../components/RouteWrapper.vue";
import CustomButton from "../components/CustomButton.vue";
import type { ButtonProps } from "../types";
import router from "@/router";

const returnBtn: ButtonProps = {
  caption: "Powrót",
  action: () => router.back(),
  icon: "fa-solid fa-arrow-left"
};
</script>