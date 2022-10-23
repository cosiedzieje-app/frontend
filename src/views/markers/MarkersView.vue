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
import type { GeoData, Marker, AddressBarValue } from '@/types'

import { geocodeFromAddress } from '@/api/geocoding';
import { useRouter } from 'vue-router';
import { ref, type Ref, onMounted } from 'vue';
import useStore from '@/store';
import { getMarkersByCity, getMarkersWithinDistance } from "@/api/backend";
import { convertLen } from '@/views/markers/ConvertLenght';

const router = useRouter();
const store = useStore();

const adressBarData: Ref<AddressBarValue> = ref({
  address: "",
  distance: "0"
});

onMounted(() => {
  if(store.getAddressBarValue !== null)
    adressBarData.value = { ...store.getAddressBarValue };
});

store.$subscribe((mut, state) => {
  if(state.addressBarValue !== null) {
    if(adressBarData.value.address !== state.addressBarValue.address || adressBarData.value.distance !== state.addressBarValue.address) {
      adressBarData.value = { ...state.addressBarValue };
    }
  }
});

const onAddressEnter = async () => {
  store.setAddressBarValue(adressBarData.value);
  store.setAddressGeocodingState("pending");
  store.toggleAddressBar(false);

  let markers: Marker[];

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

  if(adressBarData.value.distance === '0') {
    markers = await getMarkersByCity(adressBarData.value.address);
  } else { 
    markers = await getMarkersWithinDistance(
      adresL.longitude,
      adresL.latitude,
      adressBarData.value.distance
    );
    console.log()
  }

  store.setExploredMarkers(markers);
  store.setAddressGeocodingState("success");
  store.toggleAddressBar(true);
  store.setUserGeoData(newLocalization);
  router.push({ name: 'markersExplore' });
};
</script>
