<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const props = defineProps({
    canvasColorAsRGB: { type: Array, required: false, default:[0, 0, 0] }
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

      gl.clearColor(props.canvasColorAsRGB[0], props.canvasColorAsRGB[1], props.canvasColorAsRGB[2], 1)
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