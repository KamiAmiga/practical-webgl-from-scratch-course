<script setup>
import { ref } from 'vue'
import canvasVue from '~~/components/canvas.vue';

const canvasColor = ref('#012345')

const canvasColorAsRGB = (canvasColor) => {
  const splittedHex = canvasColor.slice(1).match(/.{1,2}/g);
  const rgbValues = [
      parseInt(splittedHex[0], 16),
      parseInt(splittedHex[1], 16),
      parseInt(splittedHex[2], 16)
  ].map(value => value / 255);
  return rgbValues;
}
</script>

<template>
<div>
  <h1>01 - App Boilerplate</h1>
  <input type="color" v-model="canvasColor" />
  <canvasVue :canvasColorAsRGB="canvasColorAsRGB(canvasColor)" />
</div>
</template>