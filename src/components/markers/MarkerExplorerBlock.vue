<template>
    <div @click="showDetails" class="marker-explorer-block mr-4 p-4 w-[250px] inline-flex flex-col justify-between rounded max-w-md hover:cursor-pointer" 
    :class="{
        'bg-green-700': marker.type === 'NeighborHelp',
        'bg-red-700': marker.type === 'Charity',
        'bg-yellow-700': marker.type === 'MassEvent',
        'bg-violet-700': marker.type === 'Happening'
    }">
        <div>
            <div class="text-xs pb-1 flex items-center">
                <div class="flex items-center justify-center">
                    <img class="inline mr-1 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                    <span>{{ marker.contactInfo.name }} {{ marker.contactInfo.surname }}</span>
                </div>
            </div>
            <h3 class="title pb-1 font-bold whitespace-normal">{{ marker.title }}</h3>
        </div>
        <span class="text-xs cursor-pointer hover:underline" title="Pokaż na mapie" @click.stop="markerClicked"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ marker.address.city }}, ul. {{ marker.address.street }} {{ marker.address.number }}</span>
    </div>
</template>

<script setup lang="ts">
import type {  GeoData, Marker } from '@/types';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

interface Props {
    marker: Marker
}
const props = defineProps<Props>();

async function markerClicked() {
    const newLocalization: GeoData = {
        latitude: `${props.marker.latitude}`,
        longitude: `${props.marker.longitude}`,
        city: props.marker.address.city,
        street: props.marker.address.street,
        number: props.marker.address.number
    };
    
    store.setUserGeoData(newLocalization);
}

function showDetails() {
    router.push(`/markers/explorer/details`);
    store.setCurrentlyExploredMarker(props.marker);
}
</script>

<style lang="scss" scoped>
    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
