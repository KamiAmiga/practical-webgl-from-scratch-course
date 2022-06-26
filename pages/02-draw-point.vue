<script setup lang="ts">
import canvasVue from '~~/components/canvas.vue';

const vertexShaderSource =
`#version 300 es

  in vec4 position;

  void main () {
    gl_Position = position;
    gl_PointSize = 10.0;
  }
`

const fragmentShaderSource = 
`#version 300 es

  precision highp float;

  out vec4 outColor;
  
  void main () {
    outColor = vec4(1.0, 0.2, 0.7, 1.0);
  }
`

// Array holding the x and y positions of the point to be rendered
const point = new Float32Array([0, 0.25])

useHead({
  title: '02 - Drawing a point',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
})
</script>

<template>
<div>
  <h1>02 - Drawing a point</h1>
  <canvasVue
    :canvasColorAsRGB="[0, 0, 0]"
    :vertexShader="vertexShaderSource"
    :fragmentShader="fragmentShaderSource"
    :elementToDraw="point"/>
</div>
</template>