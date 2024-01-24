export class Ctx2d {
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
    this.cache = new Map();

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
    this.cache.clear();
    this.#draw();
  }

  #clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  #memoize = (fn, config = {}) => (...args) => {
    const key = JSON.stringify(...args);
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const result = fn(...args);
    this.cache.set(key, result);
    return result;
  }

  #draw() {
    this.draw({
      ctx: this.ctx,
      w: this.width,
      h: this.height,
      memoize: this.#memoize
    });
  }

  animate() {
    this.#clearCanvas();
    this.#draw();
    requestAnimationFrame(this.animate);
  }
}

export default Ctx2d;
