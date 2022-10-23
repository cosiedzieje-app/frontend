<template>
  <RouteWrapper :scrollable="true">
    <div class="text-white">
      <div :class="`bg-${markerCategory.darkColor} hover:bg-${markerCategory.darkHoverColor} flex items-center relative`">
        <button class="m-2 absolute" title="Wróć do ogłoszeń" @click="goBack"><font-awesome-icon class="w-6 h-6 hover:text-gray-lighter transition-colors duration-200" icon="fa-solid fa-arrow-left" /></button>
        <span class="font-bold py-2 px-2 text-xl text-center w-full"> 
            <font-awesome-icon class="mr-1" icon="fa-solid fa-handshake" />
            {{ markerCategory.name }}
        </span>
      </div>
      <div class=" mx-4 my-2">
        <div class="flex items-center my-1.5">
          <img class="inline mr-1 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
          <span class="text-sm">{{ marker.contactInfo.name }} {{ marker.contactInfo.surname }}</span>
        </div>
        <h1 class="font-bold text-2xl">{{ marker.title }}</h1>
        <p class="my-3 text-lg text-justify">{{ marker.description }}</p>
        <div>
          <div v-if="marker.startTime || marker.endTime">
            <p v-if="marker.startTime">
              <font-awesome-icon icon="fa-regular fa-calendar-days" />
              Data początkowa: {{ marker.startTime }}
            </p>
            <p v-if="marker.endTime">
              <font-awesome-icon icon="fa-regular fa-calendar-days" />
              Data końcowa: {{ marker.endTime }}
            </p>
          </div>
          <p>
            <font-awesome-icon icon="fa-solid fa-address-book" />
            Kontakt: 
            <a :href="href">{{ marker.contactInfo.method.val }}</a>
          </p>
          <p class="cursor-pointer hover:underline" title="Pokaż na mapie"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ marker.address.city }}, ul. {{ marker.address.street }} {{ marker.address.number }}</p>
        </div>
      </div>
    </div>
  </RouteWrapper>
</template>
  
<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import { useRouter } from "vue-router";
import { ContactMethod, type Marker } from '@/types';
import markersCategories from "./MarkersCategories";
import useStore from "@/store";

const store = useStore();
const router = useRouter();

const goBack = () => {
  router.push('/markers/explorer');
  store.setCurrentlyExploredMarker(null);
}

const marker = store.getCurrentlyExploredMakrer as Marker;
if(!marker) goBack();

const markerCategory = markersCategories[marker.type];
const value = marker.contactInfo.method.val;
const href = marker.contactInfo.method.type === ContactMethod.PhoneNumber ? `tel:${value}` : `mailto:${value}`;
</script>