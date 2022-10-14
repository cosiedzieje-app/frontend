<template>
  <RouteWrapper class="flex flex-col justify-center items-center flex-[0_0_50%] md:flex-row">
    <section
      class="flex flex-col w-full h-full"
    >
      <AddressBar 
        v-model="address"
        @enter="onAddressEnter"
      />
      <RouterView v-slot="{ Component }">
        <transition name="view-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </section>
    <MapBox />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "../../components/RouteWrapper.vue";
import AddressBar from '@/components/AddressBar.vue';
import { RouterView } from 'vue-router';
import MapBox from "@/components/MapBox.vue";

import { ref, type Ref, watch } from 'vue';

const onAddressEnter = () => {
  console.log("Enter pressed on AddressBar");
};
const address: Ref<string> = ref("");

watch(address, (addr, oldAddr) => {
  console.log(`${oldAddr} - ${addr}`);
});
</script>