class Score {
  constructor(ctx, posX, posY, normiesCounter) {
    this.ctx = ctx
    this.pos = {
      x: posX,
      y: posY
    }
    
    this.normiesCounter = normiesCounter;
  }
  draw() {
    this.ctx.font = '58px helvetica';
    this.ctx.fillText("Score: "+ this.normiesCounter, this.pos.x, this.pos.y);
    
  }
  
}