<template>
  <div id="app">
    <Hack class="hack"></Hack>
    <!-- <div class="typed-text">
      <span>{{ output }}</span
      ><sub class="sub-text">{{ outputSub }}</sub>
    </div> -->
    <!-- <HelloWorld /> -->
    <Fire />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
import Fire from "./components/Fire.vue";

import Hack from "./components/HackRain2.vue";

@Component({
  components: {
    // HelloWorld,
    Fire,
    Hack,
  },
})
export default class App extends Vue {
  mounted(): void {
    this.writerStart();
  }

  index = 0;
  typedTimer: number | undefined = undefined;
  text = `没有耐心和耐力，就别怪现实太现实。`;
  subText = `powerby.weekit`;
  subIndex = 0;
  get outputSub(): string {
    return this.subText.substring(0, this.subIndex);
  }
  get output(): string {
    return this.text.substring(0, this.index);
  }
  delay = 200;
  writerStart(): void {
    if (this.index < this.text.length) {
      this.index++;
      this.typedTimer = setTimeout(this.writerStart, this.delay);
    } else if (this.index === this.text.length) {
      this.clear();
      this.writerStartSub();
    }
  }
  writerStartSub(): void {
    if (this.subIndex < this.subText.length) {
      this.subIndex++;
      this.typedTimer = setTimeout(this.writerStartSub, this.delay);
    }
  }

  clear(): void {
    clearTimeout(this.typedTimer);
    this.typedTimer = undefined;
  }

  beforeDestroy(): void {
    this.clear();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
html,
body {
  padding: 0;
  margin: 0;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: auto;
  margin: 0;
  background: #000;
  position: relative;
}
.hack {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.typed-text {
  height: 60px;
  font-size: 28px;
  background-color: #000;
  vertical-align: middle;
  line-height: 60px;
  color: antiquewhite;
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 10px);
  .sub-text {
    font-size: 14px;
    margin-left: 10px;
    color: antiquewhite;
    vertical-align: baseline;
  }
  /* 产生光标闪烁的效果 */
  &::after {
    content: "|";
    color: darkgray;
    animation: blink 1s infinite;
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
