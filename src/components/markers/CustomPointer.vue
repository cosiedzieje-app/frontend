<template>
     <ol-overlay :position="props.position">
            <div class="overlay-content">
                {{props.caption}}
            </div>
    </ol-overlay>
</template>
  
<script setup lang="ts">
    import type { PointerProps } from "@/types";

    // See https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
    interface Props {
        props: PointerProps
    }

    // Avoid name collision
    const defProps = defineProps<Props>();
</script>