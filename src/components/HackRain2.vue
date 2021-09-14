<template>
  <div class="hack-rain2 g-container">
    <canvas id="hack-rain-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HackRain2 extends Vue {
  timer = 0;
  mounted(): void {
    const canvas = document.querySelector(
      "#hack-rain-canvas"
    ) as HTMLCanvasElement;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    let W = window.innerWidth;
    let H = window.innerHeight;
    console.log(W, H);
    canvas.width = W;
    canvas.height = H;
    let fontSize = 16;

    let colunms = Math.floor(W / fontSize);

    const drops: number[] = [];

    for (let i = 0; i < colunms; i++) {
      drops.push(0);
    }
    //01
    let str =
      "ぁぃぅぇぉかきくけこんさしすせそた◁▣▤▥▦▧♂♀♥☻►◄▧▨♦ちつってとゐなにぬねのはひふへほゑまみむめもゃゅょゎをァィゥヴェォカヵキクケヶコサシスセソタチツッテトヰンナニヌネノハヒフヘホヱマミムメモャュョヮヲㄅㄉㄓㄚㄞㄢㄦㄆㄊㄍㄐㄔㄗㄧㄛㄟㄣㄇㄋㄎㄑㄕㄘㄨㄜㄠㄤㄈㄏㄒㄖㄙㄩㄝㄡㄥabcdefghigklmnopqrstuvwxyz0123456789%@#$<>^&*_+";

    function draw() {
      context.fillStyle = "rgba(0,0,0,0.05)";
      context.fillRect(0, 0, W, H);

      context.font = "bold " + fontSize + "px  微软雅黑";

      context.fillStyle = "#00cc33";

      for (let i = 0; i < colunms; i++) {
        let index = Math.floor(Math.random() * str.length); //random 0-1
        let x = i * fontSize;
        let y = drops[i] * fontSize;
        context.fillText(str[index], x, y);
        if (y >= canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    this.timer = setInterval(draw, 30);
  }

  beforeDestroy(): void {
    if (this.timer && this.timer !== 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  }
}
</script>

<style scoped lang="scss">
.hack-rain2 {
  height: 100vh;
  width: 100%;
  canvas {
    display: block;
  }
}
</style>
