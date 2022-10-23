<template>
  <div
    class="flex flex-col items-center rounded-md border-1 border-solid border-gray-light p-8 my-16"
  >
    <section class="my-2 w-full flex flex-col justify-center items-center text-white text-center text-4xl">
      <h1>{{ marker.title }}</h1>
      <span
        class="text-gray-light text-xl mt-2"
      >
        {{ `${marker.latitude}, ${marker.longitude}` }}
      </span>
    </section>
    <section class="my-4 w-full flex flex-col justify-center items-center text-white text-center text-2xl">
      <h2
        class="my-2 text-3xl"
      >
        Opis
      </h2>
      <p>{{ marker.description }}</p>
    </section>
    <section class="my-2 w-full flex flex-col justify-center items-center text-white text-center text-2xl">
      <AccountStat
        label="Dodano"
        :value="`${new Date(parseInt(marker.addTime) * 1000).toLocaleString()}`"
      />
      <AccountStat
        v-if="marker.startTime !== null"
        label="Data rozpoczęcia"
        :value="`${new Date(parseInt(marker.startTime) * 1000).toLocaleString()}`"
      />
      <AccountStat
        v-if="marker.endTime !== null"
        label="Data zakończenia"
        :value="`${new Date(parseInt(marker.endTime) * 1000).toLocaleString()}`"
      />
    </section>
    <section class="my-2 w-full flex flex-col justify-center items-center text-white text-center text-2xl">
      <h2
        class="my-2 text-3xl"
      >
        Dane kontaktowe
      </h2>
      <AccountStat
        v-if="marker.contactInfo.method.type === ContactMethod.PhoneNumber"
        label="Numer telefonu"
        :value="marker.contactInfo.method.val"
      />
      <AccountStat
        v-else-if="marker.contactInfo.method.type === ContactMethod.Email"
        label="Adres e-mail"
        :value="marker.contactInfo.method.val"
      />
    </section>
    <section class="my-2 w-full flex flex-col justify-center items-center text-white text-center text-2xl">
      <h2
        class="my-2 text-3xl"
      >
        Adres ogłoszenia
      </h2>
      <AccountStat
        label="Ulica"
        :value="`${marker.address.street} ${marker.address.number}`"
      />
      <AccountStat
        label="Miejscowość"
        :value="marker.address.city"
      />
    </section>
    <CustomButton
      class="w-full mt-4"
      :props="{
        caption: 'Usuń',
        action: () => deleteMarker(marker),
        icon: 'fa-solid fa-trash',
        mobile: true
      }"
    />
  </div>
</template>

<script setup lang="ts">
import AccountStat from '@/components/account/AccountStat.vue';
import type { Marker, SomsiadStatus } from "@/types";
import { ContactMethod } from '@/types';
import useStore from "@/store";
import CustomButton from "../general/CustomButton.vue";
import { deleteMarker as deleteMarkerApi } from "@/api/backend";

interface Props {
  marker: Marker;
}

const props = defineProps<Props>();
const emit = defineEmits([ "deleteStart", "deleteSuccess", "deleteError" ]);

function deleteMarker(marker: Marker) {
  emit("deleteStart", marker);
  
  deleteMarkerApi(marker.id)
    .then(() => {
      emit("deleteSuccess", marker);
    })
    .catch((err: SomsiadStatus | null) => {
      console.error(err);
      emit("deleteError", marker, err);
    });

}
</script>
