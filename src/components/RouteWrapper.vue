<template>
  <div class="route-wrapper h-full w-full overflow-auto">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.route-wrapper {
  grid-area: route;
}
</style>