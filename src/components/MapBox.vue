<template>
  <div class="map-box w-full h-full flex flex-col justify-center items-center text-center text-white text-6xl">
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="w-full h-full">

    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
    :projection="projection" />

    <ol-tile-layer>
        <ol-source-osm />
    </ol-tile-layer>

    </ol-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const center = ref([20, 50]);
const projection = ref('EPSG:4326');
const zoom = ref(8);
const rotation = ref(0);
</script>

<style lang="scss" scoped>
.map-box {
  grid-area: map;
}
</style>