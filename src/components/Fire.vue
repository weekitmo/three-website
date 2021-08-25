<template>
  <div class="file-wrapper">
    <canvas></canvas>
    <div class="static"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { createFire } from "./fire";
@Component
export default class HelloWorld extends Vue {
  mounted(): void {
    createFire.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  background: #000;
  height: 100vh;
}

canvas {
  animation: fade-in 2000ms 1000ms forwards;
  background: #000;
  background: radial-gradient(circle at 50% 75%, #311, #000);
  border-radius: 50%;
  bottom: 0;
  box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.05);
  left: 0;
  margin: auto;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.static {
  animation: fade-in2 2000ms 1000ms forwards;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/snow-static2.gif);
  border-radius: 50%;
  bottom: 0;
  height: 400px;
  margin: auto;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 400px;
}

@keyframes fade-in2 {
  to {
    opacity: 0.06;
  }
}
</style>
