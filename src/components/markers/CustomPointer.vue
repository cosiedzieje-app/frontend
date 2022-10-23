<template>
     <ol-overlay :position="props.position" @click="showDetails">
            <div v-if="props.category == 'NeighborHelp'" class="z-10 overlay-content flex justify-center items-center rounded-full bg-green-600 h-[30px] w-[30px]">
                <font-awesome-icon  class="h-[20px] w-[20px] cursor-pointer " icon="fa-solid fa-handshake"/>
            </div>

            <div v-else-if="props.category == 'Charity'" class="overlay-content flex justify-center items-center rounded-full bg-red-600 h-[30px] w-[30px]">
                <font-awesome-icon  class="h-[20px] w-[20px] cursor-pointer " icon="fa-solid fa-hand-holding-heart"/>
            </div>

            <div v-else-if="props.category == 'Happening'" class="overlay-content flex justify-center items-center rounded-full bg-violet-600 h-[30px] w-[30px]">
                <font-awesome-icon  class="h-[20px] w-[20px] cursor-pointer " icon="fa-solid fa-hand-point-up"/>
            </div>

            <div v-else-if="props.category == 'MassEvent'" class="overlay-content flex justify-center items-center rounded-full bg-yellow-700 h-[30px] w-[30px]">
                <font-awesome-icon  class="h-[20px] w-[20px] cursor-pointer " icon="fa-solid fa-star"/>
            </div>
    </ol-overlay>
</template>
  
<script setup lang="ts">
    import type { PointerProps } from "@/types";
    import useStore from '@/store';
    import { useRouter } from 'vue-router';
    import type {GeoData} from '@/types/index';
    import { convertLen } from "@/views/markers/ConvertLenght";

    const router = useRouter();
    const store = useStore();
    // See https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
    interface Props {
        props: PointerProps
    }

    // Avoid name collision
    const defProps = defineProps<Props>();

    function showDetails() {
        const newLocalization: GeoData = {
            latitude: `${defProps.props.position[1]}`,
            longitude: `${defProps.props.position[0]}`,
            city: defProps.props.marker.address.street,
            street: defProps.props.marker.address.street,
            number: defProps.props.marker.address.number
        };
        
        store.setUserGeoData(newLocalization);
        router.push(`/markers/explorer/details`);
        store.setCurrentlyExploredMarker(defProps.props.marker);

    }
</script>