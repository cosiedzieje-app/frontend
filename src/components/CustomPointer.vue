<template>
     <ol-overlay :position="props.position">
            <div class="overlay-content flex justify-start items-start">
                <font-awesome-icon class="h-[20px] w-[20px] text-red-600 cursor-pointer " :icon="props.icon"/>
                <!-- {{props.icon}} -->
            </div>
    </ol-overlay>
</template>
  
<script setup lang="ts">
    import type { PointerProps } from "../types";

    // See https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
    interface Props {
    props: PointerProps
    }

    // Avoid name collision
    const defProps = defineProps<Props>();
</script>