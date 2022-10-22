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
    :scrollable="true"
  >
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";

import { useRouter } from 'vue-router';
import useStore from '@/store';

const router = useRouter();
const store = useStore();
</script>