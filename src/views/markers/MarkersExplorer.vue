<template>
    <RouteWrapper :scrollable="true">
        <div
          class="w-full min-h-full flex flex-col items-center"
        >
          <div
            v-for="(markersData, index) in filteredMarkers"
            class="h-[25%] relative w-full flex flex-col items-center text-white px-10 my-6 text-xl"
          >
              <h2 class="w-full text-left my-2 font-bold"
                :class="{
                    'text-green-400': markersData.type === 'NeighborHelp',
                    'text-red-400': markersData.type === 'Charity',
                    'text-yellow-400': markersData.type === 'MassEvent',
                    'text-violet-400': markersData.type === 'Happening'
                }"
              > 
                  <font-awesome-icon class="mr-1" :icon="markersData.data.icon" />
                  {{ markersData.data.name }} 
              </h2>
              <div
                ref="container"
                :data-index="index"
                class="marker-explorer-scrollable h-full w-full mx-2"
              >
              <button class="absolute top-20 left-4" @click="swipeLeft(index)"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                <div 
                  v-if="markersData.markers.length !== 0" 
                  class="marker-explorer-block-wrapper min-w-full w-fit flex flex-row items-center" 
                >
                    <MarkerExplorerBlock 
                        v-for="marker in markersData.markers"
                        :marker="marker"
                    />
                </div>
                <div v-else>
                    <span class="text-gray-lighter m-4">brak</span>
                </div>
              <button class="absolute top-20 right-3" @click="swipeRight(index)"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
              </div>
          </div>
        </div>
    </RouteWrapper>
</template>

<script lang="ts" setup>
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import MarkerExplorerBlock from '@/components/markers/MarkerExplorerBlock.vue';
import useStore from "@/store";
import type { FilteredMarkersData, ListingCategory } from "@/types";
import markersCategories from "./MarkersCategories";
import { ref, type Ref } from 'vue';

const store = useStore();
const allMarkers = store.getExploredMarkers;
const container = ref(null);

const filteredMarkers: FilteredMarkersData[] = [];
if(allMarkers) {
    Object.entries(markersCategories).forEach(([categoryRawName, data]) => {
        const categoryName = categoryRawName as ListingCategory;
        filteredMarkers.push({
            data,
            type: categoryName,
            markers: allMarkers.filter(m => m.type === categoryName)
        });
    });
}

function scrollTo(element: HTMLElement, scrollPixels: number, duration: number) {
  console.log(element)
    const scrollPos = element.scrollLeft;
    if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) 
    {
      const startTime =
        "now" in window.performance
          ? performance.now()
          : new Date().getTime();
      
      function scroll(timestamp: number) {
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        element.scrollLeft = scrollPos + scrollPixels * progress;
        if (timeElapsed < duration) {
          window.requestAnimationFrame(scroll);
        } else return;
      }

      window.requestAnimationFrame(scroll);
    }
}

function swipeLeft(index: number) {
  const content = container.value as unknown as HTMLElement[];
  content.forEach(el => {
    if(el.dataset.index === index.toString()) {
      scrollTo(el, -260, 100);
    }
  });
}

function swipeRight(index: number) {
  const content = container.value as unknown as HTMLElement[];
  content.forEach(el => {
      if(el.dataset.index === index.toString()) {
        scrollTo(el, 260, 100);
      }
  });
}
</script>
