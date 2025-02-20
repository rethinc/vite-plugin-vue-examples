<script setup lang="ts">
import { routeRecords } from 'virtual:vue-examples-route-records'
import { ref } from 'vue'

import ExamplesNavigationList from './ExamplesNavigationList.vue'

const showOverlay = ref(false)

const onClickExamples = () => {
  showOverlay.value = true
}

const onClickClose = () => {
  showOverlay.value = false
}
</script>

<template>
  <div class="examples-navigation">
    <button class="button" @click="onClickExamples">Examples</button>
    <div v-if="showOverlay" class="examples-list-overlay" @click="onClickClose">
      <div class="header">
        <button class="button" @click="onClickClose">Close</button>
      </div>
      <ExamplesNavigationList :route-records="routeRecords" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles/variables.scss';

* {
  all: revert;
  font-family: sans-serif;
}

.examples-navigation {
  position: absolute;

  .button {
    border: none;
    border-radius: 16px;
    padding: 4px 12px;
    color: $color-font-primary;
    background-color: $color-background-secondary;
    position: fixed;
    right: 4px;
    bottom: 4px;

    &:hover {
      background-color: $color-highlight;
    }
  }

  .examples-list-overlay {
    display: flex;
    flex-direction: column;
    color: inherit;
    background-color: transparentize($color-background-primary, 0.02);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;

    .header {
      padding: 8px;
      display: flex;
      flex-direction: row-reverse;
      align-items: end;
      align-content: end;
    }
  }
}
</style>
