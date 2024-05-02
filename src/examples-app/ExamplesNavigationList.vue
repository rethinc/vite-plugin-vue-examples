<script setup lang="ts">
import { RouteRecordRaw } from "vue-router";

import ExamplesNavigationListEntry from "./ExamplesNavigationListEntry.vue";

withDefaults(
  defineProps<{
    routeRecords: RouteRecordRaw[];
    currentPath?: string;
  }>(),
  { currentPath: "" },
);
</script>

<template>
  <ul class="examples-navigation-list">
    <ExamplesNavigationListEntry
      v-for="(route, index) in routeRecords"
      :key="index"
      :route-record="route"
      :current-path="currentPath"
    />
  </ul>
</template>

<style scoped lang="scss">
@import "styles/variables.scss";

.examples-navigation-list {
  padding: 0;
  margin: 0 20px;
  list-style: none;
  color: $color-font-primary;
}
</style>
