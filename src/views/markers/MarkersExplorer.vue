<template>
    <RouteWrapper :scrollable="true">
        <div v-for="markerCategory in markerCategories" class="text-white mx-8 my-6 text-xl" v-dragscroll>
            <h2 :class="`my-2 font-bold ${markerCategory.titleColor}`"> 
                <font-awesome-icon class="mr-1" :icon="markerCategory.icon" />
                {{ markerCategory.name }} 
            </h2>
            <div v-if="markerCategory.markers.length !== 0" class="ml-2 overflow-x-auto text-clip whitespace-nowrap">
                <MarkerExplorerBlock 
                    v-for="marker in markerCategory.markers"
                    :title="marker.title"
                    :address="marker.address"
                    :background-color="markerCategory.backgroundColor"

                    :latitude="marker.latitude"
                    :longitude="marker.longitude"
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
import type {  Marker } from '@/types';
import type {GeoData} from '@/types/index'
import MarkerExplorerBlock from '@/components/markers/MarkerExplorerBlock.vue';
import { geocodeFromAddress } from '@/api/geocoding';
import { useRouter } from 'vue-router';
import { ref, type Ref } from 'vue';
import useStore from '@/store';

    const store = useStore();


    interface MarkerCategory {
        name: string;
        icon: string;
        titleColor: string;
        backgroundColor: string;
        markers: Marker[]
    }

    // to będzie fetchowane
    const allMarkers: Marker[] = [
        {
            id: 0,
            latitude:21.37,
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

    // tego nie trzeba ruszać
    const markerCategories: MarkerCategory[] = [
        {
            name: 'Pomoc sąsiedzka',
            icon: 'fa-solid fa-handshake',
            titleColor: 'text-green-400',
            backgroundColor: 'bg-green-700',
            markers: allMarkers.filter(m => m.type === 'NeighborHelp')
        },
        {
            name: 'Akcje charytatywne',
            icon: 'fa-solid fa-hand-holding-heart',
            titleColor: 'text-red-400',
            backgroundColor: 'bg-red-700',
            markers: allMarkers.filter(m => m.type === 'Charity')
        },
        {
            name: 'Imprezy masowe',
            icon: 'fa-solid fa-star',
            titleColor: 'text-yellow-400',
            backgroundColor: 'bg-yellow-700',
            markers: allMarkers.filter(m => m.type === 'MassEvent')
        },
        {
            name: 'Happeningi',
            icon: 'fa-solid fa-hand-point-up',
            titleColor: 'text-violet-400',
            backgroundColor: 'bg-violet-700',
            markers: allMarkers.filter(m => m.type === 'Happening')
        },
    ];

    

</script>