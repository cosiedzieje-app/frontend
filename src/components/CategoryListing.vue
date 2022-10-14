<template>
  <section
    class="w-full"
  >
    <h1>{{ category }}</h1>
    <ListingCardsWrapper 

    />
    <article
      class=""
    >
      <font-awesome-icon class="text-red-600 text-xl" icon="fa-solid fa-x" />
      <span>Nie znaleziono ogłoszeń z tej kategorii dla twojej lokalizacji</span>
    </article>
  </section>
</template>

<script setup lang="ts">
import ListingCardsWrapper from "@/components/ListingCardsWrapper.vue";

import type { ListingCategory } from '@/types';

interface Props {
  category: string;
}

const props = defineProps<Props>();
</script>