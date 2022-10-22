<template>
    <div :class="`mr-4 p-4 w-[250px] inline-flex flex-col justify-between rounded ${backgroundColor} max-w-md`" >
        <div>
            <div class="text-xs pb-1 flex items-center">
                <div class="flex items-center justify-center">
                    <img class="inline mr-1 w-4 h-4" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
                    <span>{{ authorName }}</span>
                </div>
            </div>
            <h3 class="title pb-1 font-bold whitespace-normal">{{ title }}</h3>
        </div>
        <span class="text-xs cursor-pointer hover:underline" title="Pokaż na mapie" @click="markerClicked"><font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />{{ address.city }}, ul. {{ address.street }} {{ address.number }}</span>
    </div>
</template>
  
<style lang="scss" scoped>
    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>

<script setup lang="ts">
    import type { Address, GeoData } from '@/types';
    import useStore from '@/store';
    import { convertLen } from '@/views/markers/ConvertLenght';

    const store = useStore();

    interface Props {
        title: string;
        authorName?: string;
        backgroundColor: string;
        address: Address,
        latitude: number,
        longitude: number,
    }
    
    const props = withDefaults(defineProps<Props>(), {
        authorName: 'Jan Kowalski'
    });

    async function markerClicked() {
        const newLocalization:GeoData = {
                latitude: `${props.latitude}`,
                longitude: `${props.longitude}`,
                city: props.address.city,
                street: props.address.street,
                number: props.address.number
        }
        
        store.setUserGeoData(newLocalization);
    }


</script>