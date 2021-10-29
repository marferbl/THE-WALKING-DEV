class Background {

    constructor(ctx, posX, posY, width, height) {
    this.ctx = ctx

    this.pos = {
      x: posX,
      y: posY
    }

    this.size = {
      width: width,
      height: height
    }

   
this.image = undefined;

    this.init()
  }

  init() {
    this.image = new Image()
    this.image.src = "imagen.jpg"
  }













}