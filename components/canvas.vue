<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    canvasR: { type: Number, required: false, default: .75 },
    canvasG: { type: Number, required: false, default: .95 },
    canvasB: { type: Number, required: false, default: 1 },
  })

  const canvasWidth: number = 512 * devicePixelRatio
  const canvasHeight: number = 512 * devicePixelRatio
  const webGLCanvas = ref()

  onMounted(() => {
    const gl = webGLCanvas.value.getContext('webgl') || webGLCanvas.value.getContext('experimental-webgl')

    if (!gl) {
      console.warn("Your browser does not support WebGL")
      return;
    }
    
    requestAnimationFrame(renderFrame)

    function renderFrame () {
      requestAnimationFrame(renderFrame)
      
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

      gl.clearColor(props.canvasR, props.canvasG, props.canvasB, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  })
</script>


<template>
  <canvas ref="webGLCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<style lang="scss">
  canvas {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
</style>