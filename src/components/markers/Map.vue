<template>
  <div class="map-box w-full h-full flex flex-col justify-end items-end text-center text-white text-6xl">
    <ol-map ref="map" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="w-full h-full" >
      <ol-view 
        ref="view" 
        :center="center" 
        :zoom="zoom" 
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-geolocation :projection="projection" @positionChanged="geoLocChange" v-if="located">
     </ol-geolocation>
      <ul>
        <li v-for="todo in todos" :key="id">

            <Pointer :props = "todo.props"/>
        </li>
      </ul>
    </ol-map>

    <button @click="changeLocated" class="fixed z-10 text-xl p-3 mb-7 mr-7 rounded-md transition-colors bg-main hover:bg-main-light">
      <font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-location-crosshairs" />
      Zlokalizuj mnie
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Pointer from './CustomPointer.vue';
  import type { Ref } from 'vue';
  import type { Pointer as IPointer, PointerProps, Marker } from '@/types';
  import { convertLen } from '@/views/markers/ConvertLenght';
  import { getMarkers } from '@/api/backend';
  import type {ListingCategory} from '@/types';
  import { watch } from 'vue';
  import useStore from '@/store';


  const store = useStore();
  const projection = ref('');
  const zoom = ref(6.2);
  const rotation = ref(0);

  let id = 0;
  const view = ref()
  const located = ref(false)
  const map = ref();
  let centerConverted = convertLen(19.37775993347168,52.147850036621094)
  const center = ref(centerConverted);
  
  const todos: Ref<IPointer[]> = ref([]);

  store.$subscribe(async(mutation, state) => {
    todos.value = []
    if(state.userGeoData != null) {
      center.value = [`${state.userGeoData.longitude}`, `${state.userGeoData.latitude}`];
      if(state.userGeoData.street != null || state.userGeoData.number != null ) {
        zoom.value = 17;
      }else if(state.userGeoData.city != null){
      zoom.value = 13.7
      }else{
        zoom.value = 10;
      }

      showMarkers();
    }

    if(state.pointres != null) {
      showMarkers();
    }
  });

  const geoLocChange = (loc:any) => {
      let locs = convertLen(loc[0], loc[1])
      console.log(loc)
      view.value.fit([locs[0], locs[1], locs[0], locs[1]], {
          maxZoom: 16
      })
  }

  function changeLocated() {
    located.value= !located.value; 
  }

  function showMarkers(){
    let markers = store.exploredMarkers as Marker[]
    console.log(markers)
    markers.forEach(marker => {
      let position = convertLen(marker.longitude, marker.latitude)
      let mark: PointerProps = {
        category: marker.type,
        caption: marker.title,
        position: [`${position[0]}`, `${position[1]}`]
      }

      if(!todos.value.includes({id: marker.id, props: mark})) {
        todos.value.push({id: marker.id, props: mark});
      }
    });
  }




  // function newPointer(l2:any,l1:any): void{
  //   let position = convertLen(l2, l1);
  //   let chujCyc: PointerProps = 
  //   {
  //   category: "NeighborHelp",
  //   caption: "",
  //   position: [`${position[0]}`, `${position[1]}`]
  //   }
  //   todos.value.push({id: id++, props: chujCyc})
  // }

  // newPointer(19.1198,50.278502)
</script>

<style lang="scss" scoped>
.map-box {
  grid-area: map;
}
</style>
