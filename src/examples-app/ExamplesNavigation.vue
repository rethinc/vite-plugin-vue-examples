<script setup lang="ts">
import { ref } from 'vue'

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
    <button class="button-examples" @click="onClickExamples">Examples</button>
    <div v-if="showOverlay" class="examples-list-overlay">
      <div class="header">
        <button class="button" @click="onClickClose">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles/variables.scss';

.examples-navigation {
  position: absolute;

  .button {
    border: none;
    border-radius: 16px;
    padding: 4px 12px;
    color: $color-font-primary;
    background-color: $color-background-secondary;

    &:hover {
      background-color: $color-highlight;
    }
  }

  .button-examples {
    @extend .button;
    position: fixed;
    right: 4px;
    bottom: 4px;
  }

  .examples-list-overlay {
    display: flex;
    flex-direction: column;
    color: inherit;
    background-color: transparentize($color-background-primary, 0.05);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

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
