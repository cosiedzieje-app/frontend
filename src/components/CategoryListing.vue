<template>
  <section
    class="w-full"
  >
    <h1>{{ category }}</h1>
    <CardsWrapper 

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
import CardsWrapper from "@/components/CardsWrapper.vue";

interface Props {
  category: string;
}

const props = defineProps<Props>();
</script>