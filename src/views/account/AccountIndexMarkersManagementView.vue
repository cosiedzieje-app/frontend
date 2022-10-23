<template>
  <RouteWrapper :scrollable="true">
    <transition name="view-fade" mode="out-in">
      <div
        class="w-full h-full flex flex-col justify-center items-center text-5xl text-center text-white"
        v-if="markersFetchState === 'pending'"
      >
        <font-awesome-icon
          class="text-9xl mb-4"
          icon="fa-solid fa-location-dot" 
          fade 
        />
        <h1
          class="w-full p-4"
        >Pobieranie ogłoszeń...</h1>
      </div>
      <div
        v-else-if="markersFetchState === 'error'"
      >
        <font-awesome-icon
          class="text-red-700"
          icon="fa-solid fa-triangle-exclamation"
        />
        <p
          class="w-full p-4"
        >Nie udało się pobrać ogłoszeń.</p>
      </div>
      <div
        class="w-full h-full flex flex-col justify-center items-center text-5xl text-center text-white"
        v-else-if="markersFetchState === 'success' && markers.length === 0"
      >
        <font-awesome-icon
          class="text-main text-9xl mb-4"
          icon="fa-solid fa-circle-question"
        />
        <h1
          class="w-full p-4"
        >Nie dodałeś jeszcze żadnych ogłoszeń.</h1>
      </div>
      <div
        class="flex flex-col min-h-full w-full items-center"
        v-else-if="markersFetchState === 'success' && markers.length > 0"
      >
        <h1>Twoje ogłoszenia</h1>
        <section>
          <AccountMarker
            v-for="marker in markers"
            :key="marker.id"
            :marker="marker"
          />
        </section>
      </div>
    </transition>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import AccountMarker from "@/components/account/AccountMarker.vue";
import type { Ref } from "vue";
import { ref, onMounted } from "vue";
import { getMarkers } from "@/api/backend";
import type { Marker } from "@/types";

const markersFetchState: Ref<"idle" | "pending" | "success" | "error"> = ref("idle");
const markers: Ref<Marker[]> = ref([]);

onMounted(() => {
  markersFetchState.value = "pending";
  getMarkers()
    .then(data => {
      markers.value = data;    
      markersFetchState.value = "success";
    })
    .catch(err => {
      console.error(err);
      markersFetchState.value = "error";
    });
});
</script>
