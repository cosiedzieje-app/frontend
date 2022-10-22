<template>
  <RouteWrapper class="flex flex-col justify-center overflow-auto items-center flex-[0_0_50%] md:flex-row">
    <section
      class="flex flex-col w-full h-full"
    >
      <AddressBar
        v-model="address"
        :distance="distance"
        :enabled="store.isAddressBarEnabled"
        @enter="onAddressEnter"
      />
      <transition name="view-fade" mode="out-in">
        <MarkersGeocodingPending 
          v-if="store.getAddressGeocodingState === 'pending'"
        />
        <RouterView
          v-else-if="store.getAddressGeocodingState === 'idle' || store.getAddressGeocodingState === 'success'"
          v-slot="{ Component }"
        >
          <transition name="view-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
        <MarkersGeocodingFailure
          v-else
        />
      </transition>
    </section>
    <Map />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import AddressBar from '@/components/markers/AddressBar.vue';
import { RouterView } from 'vue-router';
import Map from "@/components/markers/Map.vue";
import MarkersGeocodingPending from '@/components/markers/MarkersGeocodingPending.vue';
import MarkersGeocodingFailure from '@/components/markers/MarkersGeocodingFailure.vue';
import type { GeoData, Marker } from '@/types/index'

import { geocodeFromAddress } from '@/api/geocoding';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useStore from '@/store';
import { getMarkersByCity, getMarkersWithinDistance } from "@/api/backend";

const router = useRouter();
const store = useStore();

const address = ref("");
const distance = ref("5");

const onAddressEnter = async () => {
  store.setAddressGeocodingState("pending");
  store.toggleAddressBar(false);

  let markers: Marker[];
  if(distance.value === '0') {
    markers = await getMarkersByCity(address.value);
  } else {
    const adresL = await geocodeFromAddress(address.value);
    if(!adresL) {
      store.setAddressGeocodingState("error");
      store.toggleAddressBar(true);
      return;
    }

    markers = await getMarkersWithinDistance(
      adresL.latitude,
      adresL.longitude,
      distance.value
    );

    const newLocalization: GeoData = {
      latitude: adresL.latitude.toString(),
      longitude: adresL.longitude.toString(),
      city: adresL.locality,
      street: adresL.street,
      number: adresL.number
    }

    store.setUserGeoData(newLocalization);
  }

  // zapisanie markerów do store'a
};
</script>