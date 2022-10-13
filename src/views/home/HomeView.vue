<template>
  <RouteWrapper class="flex flex-col justify-center items-center flex-[0_0_50%] md:flex-row">
    <RouterView v-slot="{ Component }">
      <transition name="view-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <MapBox />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "../../components/RouteWrapper.vue";
import { RouterView } from 'vue-router';
import MapBox from "@/components/MapBox.vue";
</script>