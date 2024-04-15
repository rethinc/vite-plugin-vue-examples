<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
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
      <RouterLink :to="completeRoutePath">{{ routeRecord.path }}</RouterLink>
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

<style scoped lang="scss"></style>
