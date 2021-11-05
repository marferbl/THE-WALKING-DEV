class Obstacles {
  constructor(ctx, posX, posY, width, height, posXDesviation, imageName) {
    this.ctx = ctx;

    this.pos = {
      x: posX,
      y: posY,
      initialY: posY,
    };

    this.size = {
      width: width,
      height: height,
    };

    this.posXDesviation = posXDesviation;

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.frames = 4;
    this.framesIndex = 0;

    this.init();
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
  }

  draw(framesCounter) {
    //ancho de un recorte this.imageInstance.width / this.frames
    this.ctx.drawImage(
      this.imageInstance,
      (this.framesIndex * this.imageInstance.width) / this.frames, //inicio de recorte x
      0, //inicio de recorte y
      this.imageInstance.width / this.frames, //ancho de recorte
      this.imageInstance.height, //alto de recorte
      this.pos.x,
      this.pos.y,
      this.size.width,
      this.size.height
    );

    if (framesCounter % 10 === 0) {
      this.animate();
    }
  }

  animate() {
    if (this.framesIndex === 3) {
      this.framesIndex = -1;
    }
    this.framesIndex++;
  }

  //   draw() {
  //     this.ctx.drawImage(
  //       this.imageInstance,
  //       this.pos.x,
  //       this.pos.y,
  //       this.size.width,
  //       this.size.height
  //     );
  //   }

  move() {
    this.pos.x += this.posXDesviation;
    this.pos.y += this.size.height * 0.03;
  }

  increaseSize() {
    this.size.width += 2;
    this.size.height += 4;
  }
}
