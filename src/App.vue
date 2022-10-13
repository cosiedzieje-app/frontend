<template>
  <main id="app-root" class="bg-gray-dark w-screen h-screen">
    <HeaderBox class="main-header" />
    <section id="main-route-wrapper" class="h-full w-full">
      <RouterView v-slot="{ Component }">
        <transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </section>
  </main>
</template>

<script setup lang="ts">
import HeaderBox from "@/components/HeaderBox.vue";
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
#app-root {
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "header"
    "route";
}

#main-route-wrapper {
  grid-area: route;
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