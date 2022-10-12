<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBox from "@/components/HeaderBox.vue";
import MapBox from "@/components/MapBox.vue";
</script>

<template>
  <main id="app-root" class="bg-gray-dark w-screen h-screen">
    <HeaderBox class="main-header" />
    <RouterView v-slot="{ Component }">
      <transition name="view-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
    <MapBox />
  </main>
</template>

<style lang="scss">
#app-root {
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "header header"
    "route map";
}

.main-header {
  grid-area: header;
}
.view-fade {
  &-enter-active, &-leave-active {
    transition: opacity .15s;
  }
  &-enter-from, &-leave-to {
    opacity: 0;
  }
}
</style>