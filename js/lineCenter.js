class LineCenter {
  constructor(ctx, posX, posY, width, height, speed) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = "white";

    this.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    this.pos.y += this.speed;
  }
}
