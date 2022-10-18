<template>
  <AuthContext>
    <main id="app-root" class="bg-gray w-screen h-screen">
      <Header class="main-header" />
      <section id="main-route-wrapper" class="h-full w-full">
        <RouterView v-slot="{ Component }">
          <transition name="view-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </section>
    </main>
  </AuthContext>
</template>

<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import AuthContext from "@/contexts/AuthContext.vue";
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
#app-root {
  display: grid;
  grid-template-rows: 65px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "header"
    "route";

  @media screen and (max-width: 767px) {
    grid-template-rows: auto 1fr;
  }
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
