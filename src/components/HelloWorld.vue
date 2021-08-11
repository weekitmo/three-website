<template>
  <div class="hello">
    <div class="relative w-screen h-screen">
      <div class="absolute w-screen h-screen flex-center opacity-0">
        <img
          src="../assets/car.jpeg"
          class="w-60 cursor-pointer tri"
          alt=""
          ref="tri"
          crossorigin="anonymous"
        />
      </div>
      <div class="particle-explode w-full h-full bg-black"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { start } from "./three";
@Component
export default class HelloWorld extends Vue {
  timer: number | undefined = undefined;
  delay = 1000;
  mounted(): void {
    this.$nextTick(() => {
      start(".particle-explode");
      this.timer = setTimeout(() => this.tri(), this.delay);
    });
  }

  tri(): void {
    (this.$refs["tri"] as HTMLImageElement).click();
  }

  beforeDestroy(): void {
    clearTimeout(this.timer);
    this.timer = undefined;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.w-full {
  width: 100%;
}
.h-full {
  height: 100%;
}
.bg-black {
  background-color: #000;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.w-screen {
  width: 100vw;
}
.h-screen {
  height: 100vh;
}
.tri {
  border-radius: 10px;
}
.w-60 {
  width: 15rem;
}
.cursor-pointer {
  cursor: pointer;
}
.opacity-0 {
  opacity: 0;
}
</style>
