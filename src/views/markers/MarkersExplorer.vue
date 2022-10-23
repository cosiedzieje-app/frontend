<template>
    <RouteWrapper :scrollable="true">
        <div
          class="w-full min-h-full flex flex-col items-center"
        >
          <div
            v-for="markersData in filteredMarkers" 
            class="h-[25%] w-full flex flex-col items-center text-white px-8 my-6 text-xl"
          >
              <h2 class="`w-full text-left my-2 font-bold`"
              :class="{
                  'bg-green-400': markersData.type === 'NeighborHelp',
                  'bg-red-400': markersData.type === 'Charity',
                  'bg-yellow-400': markersData.type === 'MassEvent',
                  'bg-violet-400': markersData.type === 'Happening'
              }"> 
                  <font-awesome-icon class="mr-1" :icon="markersData.data.icon" />
                  {{ markersData.data.name }} 
              </h2>
              <div
                class="marker-explorer-scrollable h-full w-full overflow-x-auto ml-2"
              >
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
</script>
