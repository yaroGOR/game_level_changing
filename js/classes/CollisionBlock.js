class CollisionBlock {
    constructor({ position }) {
      this.position = position;
      this.width = 64;
      this.height = 64;
    }
  
    draw() {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }