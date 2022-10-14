<template>
  <RouteWrapper>
    <RouterView v-slot="{ Component }">
      <transition name="view-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/RouteWrapper.vue";
import { RouterView } from 'vue-router';
</script>