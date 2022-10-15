<template>
  <RouteWrapper class="flex flex-col justify-center items-center flex-[0_0_50%] md:flex-row">
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
        <HomeGeocodingPending 
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
        <HomeGeocodingFailure
          v-else
        />
      </transition>
    </section>
    <MapBox />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "../../components/RouteWrapper.vue";
import AddressBar from '@/components/AddressBar.vue';
import { RouterView } from 'vue-router';
import MapBox from "@/components/MapBox.vue";
import HomeGeocodingPending from '@/components/HomeGeocodingPending.vue';
import HomeGeocodingFailure from '@/components/HomeGeocodingFailure.vue';

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

const onAddressEnter = () => {
  //console.log("Enter pressed on AddressBar");
  store.setAddressGeocodingState("pending");
  store.toggleAddressBar(false);
  const addressVal = address.value;
  address.value = "";

  setTimeout(() => {
    store.setAddressGeocodingState("error");
    store.toggleAddressBar(true);
  }, 3000);
};
</script>