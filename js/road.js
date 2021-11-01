class Road {
  constructor(ctx, posX, posY, width, height,  imageName) {
    this.ctx = ctx

    this.pos = {
      x: posX,
      y: posY
    }

    this.size = {
      width: width,
      height: height
    }

   

    this.imageInstance = undefined
    this.imageName = imageName

    this.init()
  }

  init() {
    this.imageInstance = new Image()
    this.imageInstance.src = `../images/${this.imageName}`
  }

  draw() {
    this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.width, this.size.height)
    
  }

}