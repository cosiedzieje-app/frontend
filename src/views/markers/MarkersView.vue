<template>
  <RouteWrapper class="flex flex-col justify-center overflow-auto items-center flex-[0_0_50%] md:flex-row">
    <section
      class="flex flex-col w-full h-full"
    >
      <AddressBar
        v-model="adressBarData"
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
import {convertLen} from '@/views/markers/ConvertLenght';

const router = useRouter();
const store = useStore();

const adressBarData = ref({
  address: "",
  distance: "5"
});

const onAddressEnter = async () => {
  console.log(adressBarData);
  store.setAddressGeocodingState("pending");
  store.toggleAddressBar(false);

  let markers: Marker[];
  console.log(adressBarData.value.distance, adressBarData.value.address);
  if(adressBarData.value.distance === '0') {
    markers = await getMarkersByCity(adressBarData.value.address);
    const adresL = await geocodeFromAddress(adressBarData.value.address);
    if(!adresL) {
      store.setAddressGeocodingState("error");
      store.toggleAddressBar(true);
      return;
    }
    let position = convertLen(adresL.longitude, adresL.latitude)

    const newLocalization: GeoData = {
      latitude: position[1],
      longitude: position[0],
      city: adresL.locality,
      street: adresL.street,
      number: adresL.number
    }

    store.setUserGeoData(newLocalization);

  } else { 
    const adresL = await geocodeFromAddress(adressBarData.value.address);
    if(!adresL) {
      store.setAddressGeocodingState("error");
      store.toggleAddressBar(true);
      return;
    }

    let position = convertLen(adresL.longitude, adresL.latitude)

    markers = await getMarkersWithinDistance(
      position[1],
      position[0],
      adressBarData.value.distance
    );

    const newLocalization: GeoData = {
      latitude:  position[1],
      longitude: position[0],
      city: adresL.locality,
      street: adresL.street,
      number: adresL.number
    }

    store.setUserGeoData(newLocalization);
  }

  const newMarkers = markers.map(m => {
  return {...m, address: {
    city: 'Sosnowiec',
    street: 'Kwiatowa',
    number: '1',
  }};
});
  store.setExploredMarkers(newMarkers);
  store.setAddressGeocodingState("success");
  store.toggleAddressBar(true);
  router.push('/markers/explorer');
};
</script>