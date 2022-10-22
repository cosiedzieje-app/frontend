<template>
  <RouteWrapper
    class="flex flex-col justify-center items-center text-center text-white"
  >
    <font-awesome-icon 
      class="text-6xl mb-4"
      icon="fa-solid fa-key" 
      fade
    />
    <h1
      class="w-full text-3xl"
    >
      Trwa wylogowywanie...
    </h1>
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/general/RouteWrapper.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { logout } from "@/api/user";
import useStore from "@/store";

const store = useStore();
const router = useRouter();

onMounted(() => {
  logout()
    .then(() => { 
      store.setAuthenticated(false);
      store.clearUserData();
      router.replace({ name: "home" });
    })
    .catch(err => {
      console.error(err);
      router.replace({ name: "home" });
    });
});
</script>
