<template></template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { AuthContext } from "@/types";
import { inject, onMounted } from "vue";

const authContext: AuthContext = inject("authContext") as AuthContext;
const router = useRouter();

onMounted(() => {
  authContext.logout()
    .then(() => router.replace({ name: "home" }))
    .catch(err => {
        console.log(err);
        router.replace({ name: "home" });    
    })
});
</script>
