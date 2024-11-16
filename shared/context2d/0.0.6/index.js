export class Context2D {
  constructor(options = {}) {
    this.rootElement = options.rootElement || document.body;
    this.canvas = document.createElement('canvas');
    this.rootElement.appendChild(this.canvas)
    this.width = options.width || this.rootElement.offsetWidth;
    this.height  = options.height || this.rootElement.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.draw = this.draw.bind(this);
    this.cache = new Map();
    this.resizeThrottle = options.resizeThrottle === 0 ? 0 : options.resizeThrottle || 250;
    this.resizeOnWindowResize = options.resizeOnWindowResize === false ? false : true;

    if (this.resizeOnWindowResize) {
      self.addEventListener('resize', () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.#resizeCanvas();
        }, this.resizeThrottle);
      });
    }
  }

  #resizeCanvas() {
    this.width = this.rootElement.offsetWidth;
    this.height = this.rootElement.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.cache.clear();
  }

  #clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  #memoize = (fn) => (...args) => {
    const key = JSON.stringify(...args);
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const result = fn(...args);
    this.cache.set(key, result);
    return result;
  }

  #oscillate({ frequency, offset = 0, min = -1, max = 1}) {
    const now = Date.now();
    return Math.sin(now * frequency + offset) * (max - min) / 2 + (max + min) / 2;
  }

  draw(cb) {
    this.#clearCanvas();

    cb({
      ctx: this.ctx,
      w: this.width,
      h: this.height,
      memoize: this.#memoize,
      oscillate: this.#oscillate
    })

    requestAnimationFrame(() => this.draw(cb));
  }
}

export default Context2D;
