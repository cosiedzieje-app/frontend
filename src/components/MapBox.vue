<template>
  <!-- <input type="number" :value = "l1" @input="onInput">
  <br>
  <input type="number" :value = "l2" @input="onInput2">
  <br> -->
  <button @click="newPointer">Przeslij</button>
  <div class="map-box w-full h-full flex flex-col justify-end items-end text-center text-white text-6xl">
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="w-full h-full z-0" >
      <ol-view 
        ref="view" 
        :center="center" 
        :rotation="rotation" 
        :zoom="zoom" 
        :projection="projection" 
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
    <button @click="changeLocated" class="fixed z-10 text-xl p-3 mb-7 mr-7 rounded-md bg-green">
      <font-awesome-icon class="h-[20px] w-[20px]" icon="fa-solid fa-location-crosshairs" />
      Zlokalizuj mnie
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Pointer from '@/components/CustomPointer.vue';
  import type { PointerProps } from '../types';
  import type { Ref } from 'vue';

  const center = ref([ 19.1198,50.278502]);
  const projection = ref('EPSG:4326');
  const zoom = ref(19);
  const rotation = ref(0);
  const l1 = ref('')
  const l2 = ref('')
  let id = 0;
  const view = ref()
  const located = ref(false)

 

  const geoLocChange = (loc:any) => {
      console.log(loc);
      
      view.value.fit([loc[0], loc[1], loc[0], loc[1]], {
          maxZoom: 14
      })
  }

  function changeLocated() {
    located.value= !located.value; 
  }

  let dix: PointerProps = 
  {
    caption: "",
    icon: "",
    position: ["0","0"]
  }

  interface Pointer {
    id: number;
    props: PointerProps;
  }


  const todos: Ref<Pointer[]> = ref([]);

  function onInput(e:any) {
    l1.value = e.target.value
    console.log(l1.value)
  }

  function onInput2(e:any) {
    l2.value= e.target.value
    console.log(l2.value)
  }



  function newPointer(): void{
    let position = [l1.value, l2.value];
    
    const newProps: PointerProps = 
    {
      caption: "Chuj mi w cyca",
      icon: "fa-solid fa-location-dot",
      position: [l1.value, l2.value]
    }
    todos.value.push({id: id++, props: newProps})
  }

  // const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.map-box {
  grid-area: map;
}
</style>