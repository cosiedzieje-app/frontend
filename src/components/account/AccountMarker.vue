<template>
  <div
    class="flex flex-col items-center rounded-md"
  >
    <section>
      <h1>{{ marker.title }}</h1>
      <span>{{ `${marker.latitude}, ${marker.longitude}` }}</span>
    </section>
    <section>
      <h2>Opis</h2>
      <p>{{ marker.description }}</p>
    </section>
    <section>
      <AccountStat
        label="Dodano"
        :value="`${new Date(parseInt(marker.addTime) * 1000).toLocaleString()}`"
      />
      <AccountStat
        v-if="marker.startTime !== undefined"
        label="Data rozpoczęcia"
        :value="`${new Date(parseInt(marker.startTime) * 1000).toLocaleString()}`"
      />
      <AccountStat
        v-if="marker.endTime !== undefined"
        label="Data zakończenia"
        :value="`${new Date(parseInt(marker.endTime) * 1000).toLocaleString()}`"
      />
    </section>
    <section>
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
      :props="deleteButtonProps"
    />
  </div>
</template>

<script setup lang="ts">
import AccountStat from '@/components/account/AccountStat.vue';
import type { Marker, ButtonProps } from "@/types";
import useStore from "@/store";
import CustomButton from "../general/CustomButton.vue";

interface Props {
  marker: Marker;
}

const props = defineProps<Props>();
const emit = defineEmits([ "deleteStart", "deleteSuccess", "deleteError" ]);

function deleteMarker() {
  emit("deleteStart");
  emit("deleteSuccess");
}
const deleteButtonProps: ButtonProps = {
  caption: "Usuń",
  action: () => deleteMarker(),
  icon: "fa-solid fa-trash",
  mobile: true
}
</script>
