<template>
  <div class="map-box w-full h-full flex flex-col justify-center items-center text-center text-white text-6xl">
    <ol-map ref="map" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" class="w-full h-full" >
      <ol-view 
        ref="view" 
        :center="center" 
        :zoom="zoom" 
      />
      <!-- <ol-zoom-control />  -->
      <ol-tile-layer>
        <ol-source-xyz crossOrigin='anonymous' url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ" />
      </ol-tile-layer>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
            <Pointer :props = "todo.props"/>
        </li>
      </ul>
    </ol-map>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Pointer from './CustomPointer.vue';
  import type { Pointer as IPointer, PointerProps } from '@/types';
  import type { Ref } from 'vue';

  const map = ref();
  console.log(map);
  const center = ref([19.191665, 51.8803198]);
  const zoom = ref(6.5);
  const l1 = ref('')
  const l2 = ref('')
  let id = 0;

  let dix: PointerProps = 
  {
    caption: "",
    position: ["0","0"]
  }

  const todos: Ref<IPointer[]> = ref([]);

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