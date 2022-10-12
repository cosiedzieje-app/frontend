<template>
  <RouteWrapper class="flex flex-col items-center">
    <NoticeBox icon="fa-solid fa-key" message="Please login" level="info" />
    <section>

    </section>
  </RouteWrapper>
</template>

<script setup lang="ts">
import NoticeBox from "@/components/NoticeBox.vue";
import RouteWrapper from "../components/RouteWrapper.vue";

</script>

<style lang="scss" scoped>
  @import "../styles/colorPalette.scss";

  $bg1: map-get($cp, "purple");
  $bg2: map-get($cp, "violet");
  $fg1: map-get($cp, "green");


</style>
