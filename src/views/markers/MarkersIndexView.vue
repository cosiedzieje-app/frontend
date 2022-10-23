<template>
  <RouteWrapper 
    v-if="store.getUserGeoData === null"
    class="flex flex-col items-center justify-center text-center text-white"
    :scrollable="false"
  >
    <font-awesome-icon icon="fa-solid fa-circle-question" class="text-gray-lighter text-6xl mb-5" />
    <h1 class="text-3xl mb-2">Nie wiemy, dla jakiego regionu<br />mamy wyświetlać Ci ogłoszenia!</h1>
    <h2 class="text-2xl">Proszę, podaj swoją lokalizację w pasku powyżej.</h2>
  </RouteWrapper>
  <RouteWrapper
    v-else
    class="flex flex-col justify-center items-center w-full h-full"
  >
    <font-awesome-icon
      icon="fa-solid fa-location-dot"
      class="text-5xl text-white mb-4"
      fade
    />
    <h1 class="text-white text-3xl md:text-5xl">Wczytywanie ogłoszeń...</h1>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";

import { useRouter } from 'vue-router';
import useStore from '@/store';
import { onBeforeMount } from 'vue';

const router = useRouter();
const store = useStore();

onBeforeMount(() => {
  if(store.userGeoData !== null) {
    router.replace({ name: "markersExplore" });
  }
});
</script>
