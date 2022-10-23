<template>
  <RouteWrapper ref="routewrapper" :scrollable="true">
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
        ref="markerswrapper"
        class="flex flex-col min-h-full w-full items-center text-center text-white text-5xl"
        v-else-if="markersFetchState === 'success' && markers.length > 0"
      >
        <transition name="view-fade" mode="out-in">
          <div
            v-if="markerDeletionState.length > 0"
            class="w-full flex flex-col justify-center items-center"
          >
            <transition-group name="view-fade">
              <NoticeBox
                class="my-2"
                v-for="mds in markerDeletionState"
                :key="mds.id"
                :level="(mds.state === 'pending')
                  ? 'info'
                  : (mds.state === 'success')
                    ? 'success'
                    : 'error'
                "
                :icon="(mds.state === 'pending')
                  ? 'fa-solid fa-trash'
                  : (mds.state === 'success')
                    ? 'fa-solid fa-check'
                    : 'fa-solid fa-triangle-exclamation'
                "
                :message="(mds.state === 'pending')
                  ? `Usuwanie ogłoszenia '${mds.marker.title}'...`
                  : (mds.state === 'success')
                    ? `Pomyślnie usunięto ogłoszenie '${mds.marker.title}'!`
                    : getErrorMessage(mds.marker, mds.error)
                "
              />
            </transition-group>
          </div>
        </transition>
        <h1
          class="p-4 mt-4 w-full"
        >Twoje ogłoszenia</h1>
        <section>
          <AccountMarker
            v-for="marker in markers"
            :key="marker.id"
            :marker="marker"
            @delete-start="onMarkerDeleteStart"
            @delete-success="onMarkerDeleteSuccess"
            @delete-error="onMarkerDeleteError"
          />
        </section>
      </div>
    </transition>
  </RouteWrapper>
</template>

<script setup lang="ts">
import NoticeBox from "@/components/general/NoticeBox.vue";
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import AccountMarker from "@/components/account/AccountMarker.vue";
import type { Ref } from "vue";
import { ref, onMounted, nextTick } from "vue";
import { getMarkers } from "@/api/backend";
import type { Marker, SomsiadStatus } from "@/types";

interface MarkerDeletionState {
  id: number;
  state: "pending" | "success" | "error";
  marker: Marker;
  error: SomsiadStatus | null;
};
interface MarkerStopwatchState {
  marker: Marker;
  id: number;
}

const markerswrapper: Ref<HTMLDivElement | null> = ref(null);
const routewrapper: Ref<InstanceType<typeof RouteWrapper> | null> = ref(null);

const markersFetchState: Ref<"idle" | "pending" | "success" | "error"> = ref("idle");
const markers: Ref<Marker[]> = ref([]);
const markerDeletionState: Ref<MarkerDeletionState[]> = ref([]);
const markerStopwatchState: Ref<MarkerStopwatchState[]> = ref([]);
const markerDeletionStateCounter: Ref<number> = ref(0);

function getErrorMessage(marker: Marker, err: SomsiadStatus | null): string {
  
}

function onMarkerDeleteStart(marker: Marker) {
  nextTick(() => {
    if(markerswrapper.value !== null && routewrapper.value !== null) {
      if(routewrapper.value.wrapper !== null) {
        routewrapper.value.wrapper.scrollTo({
          top: markerswrapper.value.getBoundingClientRect().top,
          left: markerswrapper.value.getBoundingClientRect().left,
          behavior: "smooth"
        });
      }
    }
  });
  if(markerDeletionState.value.filter(v => v.marker.id === marker.id).length > 0) {
    markerDeletionState.value = markerDeletionState.value.map(v => {
      if(v.marker.id === marker.id)
        v.state = "pending";

      return v;
    });
  } else {
    markerDeletionState.value.push({
      id: markerDeletionStateCounter.value,
      state: "pending",
      marker,
      error: null
    });
    markerDeletionStateCounter.value++;
  }
  if(markerStopwatchState.value.filter(v => v.marker.id === marker.id).length > 0) {
    markerStopwatchState.value.forEach((v, i) => {
      if(v.marker.id === marker.id) {
        clearTimeout(v.id);
        markerStopwatchState.value = markerStopwatchState.value.filter((vv, ii) => i !== ii);
      }
    })
  }
  console.log(`Initialized deletion of marker "${marker.id} - ${marker.title}"`);
}
function onMarkerDeleteSuccess(marker: Marker) {
  console.log(`Marker "${marker.id} - ${marker.title}" deleted!`);
  markers.value = markers.value.filter(v => v.id !== marker.id);
  markerDeletionState.value = markerDeletionState.value.map(v => {
    if(v.marker.id === marker.id)
      v.state = "success";

    return v;
  });
  
  const st = setTimeout(() => {
    markerDeletionState.value = markerDeletionState.value.filter(v => v.marker.id !== marker.id);
    markerStopwatchState.value.forEach((v, i) => {
      if(v.marker.id === marker.id) {
        clearTimeout(v.id);
        markerStopwatchState.value = markerStopwatchState.value.filter((vv, ii) => i !== ii);
      }
    });
  }, 5000);

  markerStopwatchState.value.push({
    marker,
    id: st
  });
}
function onMarkerDeleteError(marker: Marker, error: SomsiadStatus | null) {
  console.error(`Couldn't delete marker "${marker.id} - ${marker.title}"!`);
  
  const st = setTimeout(() => {
    markerDeletionState.value = markerDeletionState.value.filter(v => v.marker.id !== marker.id);
    markerStopwatchState.value.forEach((v, i) => {
      if(v.marker.id === marker.id) {
        clearTimeout(v.id);
        markerStopwatchState.value = markerStopwatchState.value.filter((vv, ii) => i !== ii);
      }
    });
  }, 5000);

  markerStopwatchState.value.push({
    marker,
    id: st
  });
}

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
