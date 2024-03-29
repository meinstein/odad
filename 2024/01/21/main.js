export class Canvas2D {
  constructor({
    width = window.innerWidth,
    height = window.innerHeight,
    rootElement = document.querySelector('body'),
    draw
  }) {
    this.draw = draw;
    this.width = width;
    this.height = height;
    this.rootElement = rootElement;
    this.canvas = document.createElement('canvas');
    this.rootElement.appendChild(this.canvas)
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.animate = this.animate.bind(this);

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.#resizeCanvas();
      }, 250);
    });

    // draw once on init
    this.#draw();
  }

  #resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.#draw();
  }

  #clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  #draw() {
    this.draw({
      ctx: this.ctx,
      w: this.width,
      h: this.height,
    });
  }

  animate() {
    this.#clearCanvas();
    this.#draw();
    requestAnimationFrame(this.animate);
  }
}
