<template>
    <div @click="showDetails" class="mr-4 p-4 w-[250px] inline-flex flex-col justify-between rounded max-w-md hover:cursor-pointer" 
    :class="{
        'bg-green-700': type === 'NeighborHelp',
        'bg-red-700': type === 'Charity',
        'bg-yellow-700': type === 'MassEvent',
        'bg-violet-700': type === 'Happening'
    }">
        <div>
            <div class="text-xs pb-1 flex items-center">
                <div class="flex items-center justify-center">
                    <img class="inline mr-1 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                    <span>{{ userData.name }} {{ userData.surname }}</span>
                </div>
            </div>
            <h3 class="title pb-1 font-bold whitespace-normal">{{ title }}</h3>
        </div>
        <span class="text-xs cursor-pointer hover:underline" title="Pokaż na mapie" @click="markerClicked"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ address.city }}, ul. {{ address.street }} {{ address.number }}</span>
    </div>
</template>

<script setup lang="ts">
import type {  Address, GeoData, ListingCategory, UserData } from '@/types';
import useStore from '@/store';
import { useRouter } from 'vue-router';
import { getUserData } from '@/api/user';

const store = useStore();
const router = useRouter();

interface Props {
    markerId: number;
    authorId: number;
    title: string;
    address: Address,
    latitude: number,
    longitude: number,
    type: ListingCategory;
}

const props = defineProps<Props>();

// GET /user/${authorId}
const userData: UserData = await getUserData();
// const userData = {
//     username: 'annakowalska1',
//     name: 'Anna',
//     surname: 'Kowalska',
//     sex: Sex.Male,
//     reputation: 0
// };

async function markerClicked() {
    const newLocalization: GeoData = {
        latitude: `${props.latitude}`,
        longitude: `${props.longitude}`,
        city: props.address.city,
        street: props.address.street,
        number: props.address.number
    };
    
    store.setUserGeoData(newLocalization);
}

function showDetails() {
    router.push(`/markers/explorer/${props.markerId}`);
}
</script>

<style lang="scss" scoped>
    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>