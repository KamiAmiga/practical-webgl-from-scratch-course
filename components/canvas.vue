<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  canvasColorAsRGB: { type: Array, required: false, default:[0, 0, 0] },
  vertexShader: { type: String, required: false },
  fragmentShader: { type: String, required: false },
  elementToDraw: { type: Float32Array, required: false }
})

const webGLCanvas = ref()
const vertexShader = ref()
const fragmentShader = ref()
const program = ref()
const vertexBuffer = ref()
const positionAttributeLocationOnGPU = ref()

onMounted(() => {
  const gl = webGLCanvas.value.getContext('webgl2')

  if (!gl) {
    console.warn("Your browser does not support WebGL")
    return
  }

  if (gl && props.vertexShader && props.fragmentShader) {
    function createShader (gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader
      }

      console.error(`
        Error when compiling shader on the GPU:
        ${gl.getShaderInfoLog(shader)}
      `)
      gl.deleteShader(shader)
    }

    vertexShader.value = createShader(gl, gl.VERTEX_SHADER, props.vertexShader)
    fragmentShader.value = createShader(gl, gl.FRAGMENT_SHADER, props.fragmentShader)

    function createProgram (vertexShaderObject, fragmentShaderObject) {
      program.value = gl.createProgram()
      gl.attachShader(program.value, vertexShaderObject)
      gl.attachShader(program.value, fragmentShaderObject)
      gl.linkProgram(program.value)

      if (gl.getProgramParameter(program.value, gl.LINK_STATUS)) {
        return program.value
      }

      console.error(`
        Error when linking program on the GPU:
        ${gl.getProgramInfoLog(program.value)}
      `)
      gl.deleteProgram(program.value)
    }

    program.value = createProgram(vertexShader.value, fragmentShader.value)

    positionAttributeLocationOnGPU.value = gl.getAttribLocation(program.value, 'position')

    vertexBuffer.value = gl.createBuffer()
  }

  function resizeCanvasToDisplaySize(canvas) {
    // TODO : Handle devicePixelRatio
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const needResize = canvas.width  !== displayWidth ||
                      canvas.height !== displayHeight;

    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

    return needResize;
  }
  
  requestAnimationFrame(renderFrame)

  function renderFrame () {
    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

    gl.clearColor(props.canvasColorAsRGB[0], props.canvasColorAsRGB[1], props.canvasColorAsRGB[2], 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    if (props.elementToDraw && props.vertexShader && props.fragmentShader) {
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.value)

      gl.bufferData(gl.ARRAY_BUFFER, props.elementToDraw, gl.STATIC_DRAW)

      const vertexArrObj = gl.createVertexArray();

      gl.bindVertexArray(vertexArrObj);

      gl.enableVertexAttribArray(positionAttributeLocationOnGPU.value)

      gl.vertexAttribPointer(positionAttributeLocationOnGPU.value, 2, gl.FLOAT, false, 0, 0)

      gl.useProgram(program.value)

      gl.drawArrays(gl.POINTS, 0, 1)
    }

    requestAnimationFrame(renderFrame)
  }
})
</script>


<template>
<canvas ref="webGLCanvas"></canvas>
</template>

<style lang="scss">
canvas {
  display: block;
  width: 1280px;
  height: 720px;
}
</style>