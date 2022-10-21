<template>
  <div class="map-box w-full h-full flex flex-col justify-end items-end text-center text-white text-6xl">
    <ol-map ref="map" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="w-full h-full" >
      <ol-view 
        ref="view" 
        :center="center" 
        :zoom="zoom" 
      />
      <!-- <ol-zoom-control />  -->
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
    <button @click="changeLocated" class="fixed z-10 text-xl p-3 mb-7 mr-7 rounded-md bg-green">
      <font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-location-crosshairs" />
      Zlokalizuj mnie
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Pointer from './CustomPointer.vue';
  import type { Ref } from 'vue';
  import type { Pointer as IPointer, PointerProps } from '@/types';
  import '../markers/ConvertLenght.ts';

  let centerConverted = convertLen(19.37775993347168, 61.147850036621094)
  const center = ref(centerConverted);
  const projection = ref('');
  const zoom = ref(6.7);
  const rotation = ref(0);
  const l1 = ref('')
  const l2 = ref('')
  let id = 0;
  const view = ref()
  const located = ref(false)
  const map = ref();

  const geoLocChange = (loc:any) => {

      let locs = convertLen(loc[1], loc[0])
      console.log(loc)
      view.value.fit([locs[1], locs[0], locs[1], locs[0]], {
          maxZoom: 16
      })
  }

  function changeLocated() {
    located.value= !located.value; 
  }

  let dix: PointerProps = 
  {
    category: "",
    caption: "",
    // icon: "",
    position: ["0","0"]
  }

  interface Pointer {
    id: number;
    props: PointerProps;
  }

  const todos: Ref<Pointer[]> = ref([]);

  const doTestu: PointerProps = 
  {
    caption: "Chuj mi w cyca",
    category: "Charity",
    // icon: "fa-solid fa-location-dot",
    position: [centerConverted[0], centerConverted[1]]
  }
  todos.value.push({id: id++, props: doTestu})

  // function onInput(e:any) {
  //   l1.value = e.target.value
  //   console.log(l1.value)
  // }

  // function onInput2(e:any) {
  //   l2.value= e.target.value
  //   console.log(l2.value)
  // }
</script>

<style lang="scss" scoped>
.map-box {
  grid-area: map;
}
</style>
