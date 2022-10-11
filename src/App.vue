<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
<<<<<<< Updated upstream
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Dom</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
=======
  <main id="app-root" class="bg-dark-gray w-screen h-screen flex flex-col justify-center items-center">
    <RouterView v-slot="{ Component }">
      <transition name="view-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
>>>>>>> Stashed changes
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