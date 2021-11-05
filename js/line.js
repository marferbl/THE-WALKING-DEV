class Line {
  constructor(ctx, posX, posY, width, height, lineWidth, speed) {
    this.ctx = ctx;

    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.speed = speed;

    this.image = undefined;
    this.lineWidth = lineWidth;

    //   this.init()
  }

  draw() {
    this.ctx.strokeStyle = "#4d2800";
    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(this.posX, this.posY);
    this.ctx.lineTo(this.width, this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  //   draw() {
  //     this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  //   }

  move() {
    this.posY += this.speed;
    this.height += this.speed;
  }

  increaseLineWidth() {
    this.lineWidth += 1.2;
  }
}
