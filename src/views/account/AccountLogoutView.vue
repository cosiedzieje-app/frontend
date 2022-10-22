<template></template>

<script setup lang="ts">
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
