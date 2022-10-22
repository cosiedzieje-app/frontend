<template>
  <RouteWrapper class="flex flex-col justify-center overflow-auto items-center flex-[0_0_50%] md:flex-row">
    <section
      class="flex flex-col w-full h-full"
    >
      <AddressBar 
        v-model="address"
        @enter="onAddressEnter"
        :enabled="store.isAddressBarEnabled"
        :placeholder="addressBarPlaceholder"
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
import AddressBar from '@/components/categories/AddressBar.vue';
import { RouterView } from 'vue-router';
import Map from "@/components/markers/Map.vue";
import MarkersGeocodingPending from '@/components/markers/MarkersGeocodingPending.vue';
import MarkersGeocodingFailure from '@/components/markers/MarkersGeocodingFailure.vue';
import type {GeoData} from '@/types/index'

import { geocodeFromAddress } from '@/api/geocoding';
import { useRouter } from 'vue-router';
import { ref, type Ref } from 'vue';
import useStore from '@/store';

const router = useRouter();
const store = useStore();
const address: Ref<string> = ref("");
const addressBarPlaceholder: Ref<string | undefined> = ref(undefined);

store.$subscribe((mutation, state) => {
  if(state.addressGeocodingState === 'pending') {
    addressBarPlaceholder.value = "Trwa geokodowanie...";
  } else {
    addressBarPlaceholder.value = undefined;
  }
});

const onAddressEnter = async () => {
  //console.log("Enter pressed on AddressBar");
  store.setAddressGeocodingState("pending");
  store.toggleAddressBar(false);
  const addressVal = address.value;
  address.value = "";
  let adresL: any;

  adresL = await geocodeFromAddress(addressVal);
  
  const newLocalization:GeoData = {
        latitude: adresL.latitude,
        longitude: adresL.longitude,
        city: adresL.locality,
        street: adresL.street,
        number: adresL.number
  }
  
  store.setUserGeoData(newLocalization);
  console.log(adresL);

  setTimeout(() => {
    store.setAddressGeocodingState("error");
    store.toggleAddressBar(true);
  }, 3000);
};
</script>