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
import type { FilteredMarkersData, ListingCategory, Marker } from "@/types";
import markersCategories from "./MarkersCategories";

// to będzie fetchowane
const allMarkers: Marker[] = [
    {
        id: 0,
        userID: 1,
        latitude: 21.37,
        longitude: 21.37,
        title: "Wyprowadzę psa",
        type: "NeighborHelp",
        address: {
            city: 'Sosnowiec',
            street: 'Jagiellońska',
            number: '13'
        }
    },
];

allMarkers[1] = { ...allMarkers[0], title: 'Białaczka wykańcza Adasia', type: 'Charity' };
allMarkers[2] = { ...allMarkers[0], title: 'bardzo długi title żeby wszystko się zesrało ardzo długi title żeby wszystko się zesrało', type: 'Happening' };
allMarkers[3] = { ...allMarkers[0], title: 'inba w parku marii stupak', type: 'MassEvent' };
for(let i = 4; i < 10; i++) {
    allMarkers[i] = { ...allMarkers[0], type: 'NeighborHelp' };
}

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