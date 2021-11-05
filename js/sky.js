class Sky {
  constructor(ctx, posX, posY, width, height, imageName, speed) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    (this.speed = speed), (this.imageInstance = undefined);
    this.imageName = imageName;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
  }

  draw() {
    this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.width, this.size.height);
    this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y + this.size.height, this.size.width, this.size.height);
  }

  move() {
    if (this.pos.y < -this.size.height) {
      this.pos.y = 0;
    }

    this.pos.y -= this.speed;
  }
}
