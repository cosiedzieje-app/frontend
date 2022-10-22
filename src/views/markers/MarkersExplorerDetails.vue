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
          <span class="text-sm">{{ data.contactInfo.name }} {{ data.contactInfo.surname }}</span>
        </div>
        <h1 class="font-bold text-2xl">{{ data.title }}</h1>
        <p class="my-3 text-lg text-justify">{{ data.description }}</p>
        <div>
          <p>
            <font-awesome-icon icon="fa-solid fa-address-book" />
            Kontakt: 
            <a :href="href">{{ data.contactInfo.method.val }}</a>
          </p>
          <p class="cursor-pointer hover:underline" title="Pokaż na mapie"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ data.address.city }}, ul. {{ data.address.street }} {{ data.address.number }}</p>
        </div>
      </div>
    </div>
  </RouteWrapper>
</template>
  
<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import { useRouter, useRoute } from "vue-router";
import type { MarkerDetails } from '@/types';
import { ContactMethod } from '@/types';
import markersCategories from "./MarkersCategories";

const router = useRouter();
const route = useRoute(); 

// GET /markers/${route.params.id}
const data: MarkerDetails = {
  id: 1,
  userID: 2,
  latitude: 0,
  longitude: 0,
  title: "Moja córka wyprowadza psy",
  description: "Moja trzynastoletnia córka, która uwielbia zwierzęta, chciałaby zarobić pierwsze pieniądze. Oferujemy wyprowadzanie psów w weekendy (sobota i niedziela) w godzinach popołudniowych (14:00 - 18:00). Za 10min spaceru - 10 zł, za 20min - 15zł, za 30min - 20zł. Oferta obowiązuje jedynie na osiedlu przy ul. Długosza i jego okolicach do maksymalnie 2km. Gorąco zapraszamy do kontaktu!",
  addTime: "123",
  endTime: "456",
  address: {
    city: "Sosnowiec",
    street: "Jana Długosza",
    number: "5"
  },
  contactInfo: {
    name: "Anna",
    surname: "Kowalska",
    address: {
      city: "Sosnowiec",
      street: "Jana Długosza",
      number: "5"
    },
    method: {
      type: ContactMethod.PhoneNumber,
      val: "123456789"
    }
  },
  type: 'Charity'
};

const goBack = () => {
  router.push('/markers/explorer');
}

const markerCategory = markersCategories[data.type];
const value = data.contactInfo.method.val;
const href = data.contactInfo.method.type === ContactMethod.PhoneNumber ? `tel:${value}` : `mailto:${value}`;
</script>