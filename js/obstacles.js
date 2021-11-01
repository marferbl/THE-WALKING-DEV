class Obstacles {
    constructor(ctx, posX, posY, width, height, posXDesviation, imageName) {
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

        this.posXDesviation = posXDesviation

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
        this.pos.x += this.posXDesviation
        this.pos.y += 5
    }

    increaseSize() {
        this.size.width += 3
        this.size.height += 6
    }
}