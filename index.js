/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const pic = document.getElementById("patternImage");
 pic.style.width = "auto";
 pic.style.height = "600px";

 const pat = ctx.createPattern(pic, "repeat");




class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.velX = 0
    this.velY = Math.random() * 0.5 + 0.5
    this.rad = Math.floor(Math.random() * 10 + 10);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = pat;
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fill();
  }
  update(){
    this.x += this.velX
    this.y += this.velY

    if(this.y > this.effect.height + this.rad * 2 ){
      this.y = -this.rad * 2
    }

  }
}

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.numParticles = 1000;
    this.particleArray = [];
    this.init()
  }
  init() {
    for (let i = 0; i < this.numParticles; i++) {
      this.particleArray.push(new Particle(this));
    }
  }
  render(ctx) {
   this.particleArray.forEach(particle => {
    particle.draw(ctx)
    particle.update()
  })
  }
}

const effect = new Effect(canvas.width, canvas.height);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(ctx);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
