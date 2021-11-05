class Zombie {
  constructor(canvasSizeWidth, ctx, posX, posY, width, height, imageName) {
    this.canvasSizeWidth = canvasSizeWidth;
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

    this.imageInstance = undefined;
    this.imageName = imageName;

    this.init();

    this.frames = 4;
    this.framesIndex = 0;
  }

  init() {
    this.imageInstance = new Image();
    this.imageInstance.src = `images/${this.imageName}`;
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

  //SPRITES
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

  //FIN DE SPRITES
  move() {
    this.moveLeft();
    this.moveRight();
  }

  moveLeft() {
    // console.log("Im moving left", this.pos.x)
    this.pos.x > 1 ? (this.pos.x -= 50) : null;
  }

  moveRight() {
    // console.log("Im moving right", this.pos.x)
    this.pos.x < this.canvasSizeWidth - this.size.width ? (this.pos.x += 50) : null;
  }
}
