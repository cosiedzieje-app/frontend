<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main id="app-root" class="bg-dark-gray w-screen h-screen flex flex-col justify-center items-center">
    <RouterView v-slot="{ Component }">
      <transition name="view-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style lang="scss">
.view-fade {
  &-enter-active, &-leave-active {
    transition: opacity .15s;
  }
  &-enter-from, &-leave-to {
    opacity: 0;
  }
}
</style>