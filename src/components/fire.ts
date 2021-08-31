/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFire: any = {};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| UTILITY
           |=|________________________________/
*/

createFire.PI = Math.PI;
createFire.TAU = createFire.PI * 2;

createFire.rand = (min, max) => {
  return Math.random() * (max - min) + min;
};

createFire.hsla = (h, s, l, a) => {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

createFire.baseRange = (base, range) => {
  return base + createFire.rand(-range, range);
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| POOL
           |=|________________________________/
*/

createFire.Pool = class Pool {
  base;
  preallocateAmount: any;
  alive: any[];
  dead: any[];
  length: number;
  deadLength: number;
  constructor(base, preallocateAmount) {
    this.base = base;
    this.preallocateAmount = preallocateAmount || 0;
    this.alive = [];
    this.dead = [];
    this.length = 0;
    this.deadLength = 0;
    if (this.preallocateAmount) {
      this.preallocate();
    }
  }
  preallocate() {
    for (let i = 0; i < this.preallocateAmount; i++) {
      this.dead.push(new this.base());
      this.deadLength++;
    }
  }
  create(opt) {
    if (this.deadLength) {
      const obj = this.dead.pop();
      obj.init(opt);
      this.alive.push(obj);
      this.deadLength--;
      this.length++;
      return obj;
    } else {
      const newItem = new this.base();
      newItem.init(opt);
      this.alive.push(newItem);
      this.length++;
      return newItem;
    }
  }
  release(obj) {
    const i = this.alive.indexOf(obj);
    if (i > -1) {
      this.dead.push(this.alive.splice(i, 1)[0]);
      this.length--;
      this.deadLength++;
    }
  }
  empty() {
    this.alive.length = 0;
    this.dead.length = 0;
    this.length = 0;
    this.deadLength = 0;
  }
  each(action, asc) {
    let i = this.length;
    while (i--) {
      this.alive[i][action](i);
    }
  }
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| PARTICLE
           |=|________________________________/
*/

createFire.Particle = class Particle {
  velocity: any;
  angle: any;
  x: number;
  y: number;
  life: any;
  alpha: number;
  parent: any;
  acceleration: any;
  wander: any;
  decay: any;
  fade: any;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.alpha = 0;
  }
  init(opt) {
    Object.assign(this, opt);
    this.life = 1;
  }
  step() {
    this.velocity += this.acceleration;
    this.angle += createFire.rand(-this.wander, this.wander);
    this.x += Math.cos(this.angle) * this.velocity;
    this.y += Math.sin(this.angle) * this.velocity;
    this.life -= this.decay;
    this.alpha = this.fade ? this.life * 1.5 : 1;
    if (this.life < 0) {
      this.parent.particles.release(this);
    }
  }
  draw() {
    createFire.ctx.beginPath();
    createFire.ctx.arc(this.x, this.y, this.radius, 0, createFire.TAU);
    createFire.ctx.fillStyle = createFire.hsla(
      this.hue,
      this.saturation,
      this.lightness,
      this.alpha
    );
    createFire.ctx.fill();
  }
  radius(x: number, y: number, radius: any, arg3: number, TAU: any) {
    throw new Error("Method not implemented.");
  }
  lightness(
    hue: (hue: any, saturation: any, lightness: any, alpha: number) => any,
    saturation: (
      hue: (hue: any, saturation: any, lightness: any, alpha: number) => any,
      saturation: any,
      lightness: any,
      alpha: number
    ) => any,
    lightness: any,
    alpha: number
  ): any {
    throw new Error("Method not implemented.");
  }
  saturation(
    hue: (hue: any, saturation: any, lightness: any, alpha: number) => any,
    saturation: any,
    lightness: any,
    alpha: number
  ): any {
    throw new Error("Method not implemented.");
  }
  hue(hue: any, saturation: any, lightness: any, alpha: number): any {
    throw new Error("Method not implemented.");
  }
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| PARTICLE EMITTER
           |=|________________________________/
*/

createFire.ParticleEmitter = class particleEmitter {
  particles: any;
  interval: any;
  radius: any;
  y: any;
  x: any;
  angle: any;
  velocity: any;
  acceleration: any;
  saturation: any;
  decay: any;
  hue: any;
  lightness: any;
  wander: any;
  fade: any;
  blend: any;
  constructor(opt) {
    Object.assign(this, opt);
    this.particles = new createFire.Pool(createFire.Particle, 100);
  }
  step() {
    if (createFire.tick % this.interval === 0) {
      this.particles.create({
        parent: this,
        x: createFire.baseRange(this.x.base, this.x.range),
        y: createFire.baseRange(this.y.base, this.y.range),
        radius: createFire.baseRange(this.radius.base, this.radius.range),
        angle: createFire.baseRange(this.angle.base, this.angle.range),
        velocity: createFire.baseRange(this.velocity.base, this.velocity.range),
        acceleration: createFire.baseRange(
          this.acceleration.base,
          this.acceleration.range
        ),
        decay: createFire.baseRange(this.decay.base, this.decay.range),
        hue: createFire.baseRange(this.hue.base, this.hue.range),
        saturation: createFire.baseRange(
          this.saturation.base,
          this.saturation.range
        ),
        lightness: createFire.baseRange(
          this.lightness.base,
          this.lightness.range
        ),
        wander: this.wander,
        fade: this.fade,
      });
    }
    this.particles.each("step");
  }
  draw() {
    createFire.ctx.globalCompositeOperation = this.blend;
    this.particles.each("draw");
  }
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| INIT
           |=|________________________________/
*/

createFire.init = () => {
  createFire.c = document.querySelector("canvas");
  createFire.ctx = createFire.c.getContext("2d");
  const maxSize = 400;
  let w = maxSize;
  let h = maxSize;
  if (window.innerWidth < maxSize) {
    h = w = window.innerWidth;
  }
  createFire.w = createFire.c.width = w;
  createFire.h = createFire.c.height = h;
  createFire.particleEmitters = [];
  createFire.tick = 1;

  // Spark Emitter
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w * 0.5,
        range: 20,
      },
      y: {
        base: createFire.h,
        range: 20,
      },
      radius: {
        base: 0.75,
        range: 0.4,
      },
      angle: {
        base: -createFire.PI * 0.5,
        range: createFire.PI * 0.01,
      },
      velocity: {
        base: 0.5,
        range: 0.5,
      },
      acceleration: {
        base: 0.01,
        range: 0.01,
      },
      decay: {
        base: 0.005,
        range: 0.001,
      },
      hue: {
        base: 30,
        range: 30,
      },
      saturation: {
        base: 80,
        range: 20,
      },
      lightness: {
        base: 80,
        range: 20,
      },
      wander: 0.06,
      blend: "lighter",
      fade: true,
      interval: 5,
    })
  );

  // Negative Emitter 1
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w - 100,
        range: 25,
      },
      y: {
        base: createFire.h,
        range: 5,
      },
      radius: {
        base: 20,
        range: 10,
      },
      angle: {
        base: -createFire.PI * 0.55,
        range: createFire.PI * 0.05,
      },
      velocity: {
        base: 2,
        range: 0,
      },
      acceleration: {
        base: 0.02,
        range: 0.01,
      },
      decay: {
        base: 0.001,
        range: 0,
      },
      hue: {
        base: 0,
        range: 0,
      },
      saturation: {
        base: 0,
        range: 0,
      },
      lightness: {
        base: 0,
        range: 0,
      },
      wander: 0.05,
      blend: "destination-out",
      fade: false,
      interval: 1,
    })
  );

  // Negative Emitter 2
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: 100,
        range: 25,
      },
      y: {
        base: createFire.h,
        range: 5,
      },
      radius: {
        base: 20,
        range: 10,
      },
      angle: {
        base: -createFire.PI * 0.45,
        range: createFire.PI * 0.05,
      },
      velocity: {
        base: 2,
        range: 0,
      },
      acceleration: {
        base: 0.02,
        range: 0.01,
      },
      decay: {
        base: 0.001,
        range: 0,
      },
      hue: {
        base: 0,
        range: 0,
      },
      saturation: {
        base: 0,
        range: 0,
      },
      lightness: {
        base: 0,
        range: 0,
      },
      wander: 0.05,
      blend: "destination-out",
      fade: false,
      interval: 1,
    })
  );

  // Yellow Emitter
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w * 0.5,
        range: 20,
      },
      y: {
        base: createFire.h,
        range: 20,
      },
      radius: {
        base: 15,
        range: 5,
      },
      angle: {
        base: -createFire.PI * 0.5,
        range: createFire.PI * 0.05,
      },
      velocity: {
        base: 1.5,
        range: 0,
      },
      acceleration: {
        base: 0.02,
        range: 0.01,
      },
      decay: {
        base: 0.0075,
        range: 0,
      },
      hue: {
        base: 60,
        range: 0,
      },
      saturation: {
        base: 100,
        range: 0,
      },
      lightness: {
        base: 70,
        range: 0,
      },
      wander: 0.01,
      blend: "source-over",
      fade: false,
      interval: 2,
    })
  );

  // White Emitter
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w * 0.5,
        range: 20,
      },
      y: {
        base: createFire.h - 20,
        range: 20,
      },
      radius: {
        base: 2,
        range: 1,
      },
      angle: {
        base: -createFire.PI * 0.5,
        range: createFire.PI * 0.001,
      },
      velocity: {
        base: 0.5,
        range: 0,
      },
      acceleration: {
        base: 0.02,
        range: 0.02,
      },
      decay: {
        base: 0.0075,
        range: 0,
      },
      hue: {
        base: 60,
        range: 0,
      },
      saturation: {
        base: 90,
        range: 0,
      },
      lightness: {
        base: 100,
        range: 0,
      },
      wander: 0.025,
      blend: "source-over",
      fade: false,
      interval: 3,
    })
  );

  // Orange Emitter
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w * 0.5,
        range: 20,
      },
      y: {
        base: createFire.h - 20,
        range: 15,
      },
      radius: {
        base: 25,
        range: 5,
      },
      angle: {
        base: -createFire.PI * 0.5,
        range: createFire.PI * 0.025,
      },
      velocity: {
        base: 2,
        range: 0.25,
      },
      acceleration: {
        base: 0.01,
        range: 0.01,
      },
      decay: {
        base: 0.0075,
        range: 0,
      },
      hue: {
        base: 30,
        range: 0,
      },
      saturation: {
        base: 90,
        range: 0,
      },
      lightness: {
        base: 50,
        range: 0,
      },
      wander: 0.01,
      blend: "source-over",
      fade: false,
      interval: 2,
    })
  );

  // Red Emitter
  createFire.particleEmitters.push(
    new createFire.ParticleEmitter({
      x: {
        base: createFire.w * 0.5,
        range: 30,
      },
      y: {
        base: createFire.h - 20,
        range: 15,
      },
      radius: {
        base: 35,
        range: 10,
      },
      angle: {
        base: -createFire.PI * 0.5,
        range: createFire.PI * 0.025,
      },
      velocity: {
        base: 2,
        range: 0.25,
      },
      acceleration: {
        base: 0.01,
        range: 0.01,
      },
      decay: {
        base: 0.0075,
        range: 0,
      },
      hue: {
        base: 0,
        range: 0,
      },
      saturation: {
        base: 90,
        range: 0,
      },
      lightness: {
        base: 50,
        range: 0,
      },
      wander: 0.01,
      blend: "source-over",
      fade: false,
      interval: 2,
    })
  );

  createFire.gradient = createFire.ctx.createLinearGradient(
    0,
    0,
    0,
    createFire.h * 0.75
  );
  createFire.gradient.addColorStop(0, createFire.hsla(0, 0, 0, 1));
  createFire.gradient.addColorStop(1, createFire.hsla(0, 0, 0, 0));

  createFire.loop();
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| STEP
           |=|________________________________/
*/

createFire.step = () => {
  let i = createFire.particleEmitters.length;
  while (i--) {
    createFire.particleEmitters[i].step();
  }
  createFire.tick++;
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| DRAW
           |=|________________________________/
*/

createFire.draw = () => {
  createFire.ctx.clearRect(0, 0, createFire.w, createFire.h);
  let i = createFire.particleEmitters.length;
  while (i--) {
    createFire.particleEmitters[i].draw();
  }

  createFire.ctx.globalCompositeOperation = "destination-out";
  createFire.ctx.fillStyle = createFire.gradient;
  createFire.ctx.fillRect(0, 0, createFire.w, createFire.h);

  createFire.ctx.beginPath();
  createFire.ctx.globalCompositeOperation = "source-over";
  createFire.ctx.arc(
    createFire.w * 0.5,
    createFire.h + 40,
    63,
    0,
    createFire.TAU
  );
  createFire.ctx.fillStyle = "#f00";
  createFire.ctx.fill();

  createFire.ctx.beginPath();
  createFire.ctx.globalCompositeOperation = "source-over";
  createFire.ctx.arc(
    createFire.w * 0.5,
    createFire.h + 40,
    60,
    0,
    createFire.TAU
  );
  createFire.ctx.fillStyle = "#000";
  createFire.ctx.fill();
};

/*
           |=|ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ/
[::{}{}{}{}|=| LOOP
           |=|________________________________/
*/

createFire.loop = () => {
  requestAnimationFrame(createFire.loop);
  createFire.step();
  createFire.draw();
};
