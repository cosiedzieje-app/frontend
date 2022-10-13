<template>
  <RouteWrapper class="account-login flex flex-col items-center">
    <NoticeBox 
      v-if="redirected"
      message="Log in to continue"
      icon="fa-solid fa-key"
      level="warn"
    />
  </RouteWrapper>
</template>

<script setup lang="ts">
import RouteWrapper from "@/components/RouteWrapper.vue";
import NoticeBox from "@/components/NoticeBox.vue";

import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

const redirected = ref<boolean>(route.query.redirect === 'true');
</script>