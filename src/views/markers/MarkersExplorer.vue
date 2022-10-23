<template>
    <RouteWrapper :scrollable="true">
        <div v-for="markersData in filteredMarkers" class="text-white mx-8 my-6 text-xl">
            <h2 :class="`my-2 font-bold ${markersData.data.lightColor}`"> 
                <font-awesome-icon class="mr-1" :icon="markersData.data.icon" />
                {{ markersData.data.name }} 
            </h2>
            <div v-if="markersData.markers.length !== 0" class="ml-2 w-full overflow-x-auto text-clip whitespace-nowrap" v-dragscroll>
                <MarkerExplorerBlock 
                    :customCSS="`bg-${markersData.data.darkColor}`"
                    v-for="marker in markersData.markers"

                    :marker-id="marker.id"
                    :title="marker.title"
                    :address="marker.address"
                    :author-id="marker.userID"
                    :latitude="marker.latitude"
                    :longitude="marker.longitude"
                    :type="markersData.type"
                />
            </div>
            <div v-else>
                <span class="text-gray-lighter m-4">brak</span>
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

const store = useStore();
const allMarkers = store.getExploredMarkers;

const filteredMarkers: FilteredMarkersData[] = [];
Object.entries(markersCategories).forEach(([categoryName, data]) => {
    let categoryName1 = categoryName as ListingCategory;
    filteredMarkers.push({
        data,
        type: categoryName1,
        markers: allMarkers.filter(m => m.type === categoryName)
    });
});
</script>