<template>
  <RouteWrapper :scrollable="true">
    <div
      class="w-full min-h-full flex flex-col items-center text-white"
    >
      <section class="my-2 w-full flex flex-col items-center">
        <h2 class="text-4xl p-2">Twoje personalne dane</h2>
        <article class="w-[75%] flex flex-col items-center">
          <AccountStat
            label="Imię"
            :value="userData.name"
          />
          <AccountStat
            label="Nazwisko"
            :value="userData.surname"
          />
          <AccountStat
            label="Płeć"
            :value="sexString"
          />
        </article>
      </section>
      <section class="my-2 w-full flex flex-col items-center">
        <h2 class="text-4xl p-2">Twój adres</h2>
        <article class="w-[75%] flex flex-col items-center">
          <AccountStat
            label="Ulica"
            :value="`${userData.address.street} ${userData.address.number}`"
          />
          <AccountStat
            label="Miejscowość"
            :value="userData.address.city"
          />
        </article>
      </section>
      <section class="my-2 w-full flex flex-col items-center">
        <h2 class="text-4xl p-2">Twoje statystyki</h2>
        <article class="w-[75%] flex flex-col items-center">
          <AccountStat
            label="Reputacja"
            :value="userData.reputation.toString()"
          />
          <AccountStat
            label="Ilość dodanych ogłoszeń"
            :value="Number(0).toString()"
          />
        </article>
      </section>
    </div>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from '@/components/general/RouteWrapper.vue';
import AccountStat from '@/components/account/AccountStat.vue';
import { Sex } from "@/types";
import type { UserData } from "@/types";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import useStore from '@/store';

const store = useStore();
const userData = store.getUserData as UserData;
const sexString: ComputedRef<string> = computed(() => {
  switch(userData.sex) {
    case Sex.Male:
      return "Mężczyzna";
    break;
    case Sex.Female:
      return "Kobieta";
    break;
    case Sex.Other:
      return "Inna";
    break;
  }
})
</script>
