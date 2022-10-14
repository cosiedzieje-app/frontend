<template>
  <RouteWrapper class="flex flex-col items-center justify-center text-center text-white">
    <font-awesome-icon icon="fa-solid fa-circle-exclamation" class="text-red-600 text-6xl mb-5" />
    <h1 class="text-4xl">Nie wiemy, dla jakiego regionu mamy wyświetlać Ci ogłoszenia!</h1>
    <h2 class="text-2xl">Proszę, podaj swoją lokalizację w pasku powyżej.</h2>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/RouteWrapper.vue";
</script>