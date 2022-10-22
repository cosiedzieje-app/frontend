<template>
    <RouteWrapper :scrollable="true">
        <div v-for="markerCategory in markerCategories" class="text-white mx-8 my-6 text-xl" v-dragscroll>
            <h2 :class="`my-2 font-bold ${markerCategory.titleColor}`"> 
                <font-awesome-icon class="mr-1" :icon="markerCategory.icon" />
                {{ markerCategory.name }} 
            </h2>
            <div v-if="markerCategory.markers.length !== 0" class="ml-2 overflow-x-auto text-clip whitespace-nowrap">
                <div v-for="marker in markerCategory.markers" :class="`mr-4 p-4 w-[250px] inline-flex flex-col justify-between rounded ${markerCategory.backgroundColor} max-w-md`" >
                    <div>
                        <div class="text-xs pb-1 flex items-center">
                            <div class="flex items-center justify-center">
                                <img class="inline mr-1 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                                <span>Jan Kowalski</span>
                            </div>
                        </div>
                        <h3 class="title pb-1 font-bold whitespace-normal">{{ marker.title }}</h3>
                    </div>
                    <span class="text-xs cursor-pointer hover:underline" title="Pokaż na mapie" @click="markerClicked(marker.address.city, marker.address.street, marker.address.number)"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ marker.address.city }}, ul. {{ marker.address.street }} {{ marker.address.number }}</span>
                </div>
            </div>
            <div v-else>
                <span class="text-gray-lighter m-4">brak</span>
            </div>
        </div>
    </RouteWrapper>
</template>

<style lang="scss" scoped>
    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>

<script lang="ts" setup>
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import type {  Marker } from '@/types';
import type {GeoData} from '@/types/index'

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
            latitude: 0,
            longitude: 0,
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

    async function markerClicked(city:any,street:any,number:any) {
        let adresL:any;

        adresL = await geocodeFromAddress(`${number} ${street} ${city}`);
  
        const newLocalization:GeoData = {
                latitude: adresL.latitude,
                longitude: adresL.longitude,
                city: adresL.locality,
                street: adresL.street,
                postalCode: adresL.postal_code,
                number: adresL.number
        }
        
        store.setUserGeoData(newLocalization);
    }

</script>