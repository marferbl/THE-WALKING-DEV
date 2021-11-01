class Zombie {
    constructor(canvasSizeWidth, ctx, posX, posY, width, height, imageName) {
        this.canvasSizeWidth = canvasSizeWidth
        this.ctx = ctx

        this.pos = {
            x: posX,
            y: posY,
            initialY: posY
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

    move() {
        this.moveLeft()
        this.moveRight()
    }

    moveLeft() {
        // console.log("Im moving left", this.pos.x)
        this.pos.x > 0 ? this.pos.x -= 15 : null
    }

    moveRight() {
        // console.log("Im moving right", this.pos.x)
        this.pos.x < this.canvasSizeWidth - this.size.width ? this.pos.x += 15 : null
    }
}