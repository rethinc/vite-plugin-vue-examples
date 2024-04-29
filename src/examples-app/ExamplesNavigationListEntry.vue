<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

import ExamplesNavigationList from './ExamplesNavigationList.vue'

const props = withDefaults(
  defineProps<{
    routeRecord: RouteRecordRaw
    currentPath?: string
  }>(),
  { currentPath: '' }
)

const isExample = computed(() => {
  return !!props.routeRecord.component
})

const completeRoutePath = computed(() => {
  return `${props.currentPath}/${props.routeRecord.path}`
})
</script>

<template>
  <li class="examples-navigation-list-entry">
    <template v-if="isExample">
      <RouterLink class="link" :to="completeRoutePath">{{
        routeRecord.path
      }}</RouterLink>
    </template>
    <template v-else>
      {{ routeRecord.path }}
    </template>
    <ExamplesNavigationList
      v-if="routeRecord.children"
      :route-records="routeRecord.children"
      :current-path="completeRoutePath"
    />
  </li>
</template>

<style scoped lang="scss">
@import 'styles/variables.scss';

.examples-navigation-list-entry {
  color: $color-font-secondary;
  padding-top: 6px;

  .link {
    text-decoration: none;
    color: $color-font-primary;

    &:hover {
      color: $color-font-highlight;
    }
  }
}
</style>
