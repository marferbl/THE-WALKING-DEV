const game = {
  title: 'The walking dev',
  author: 'Marcos y Lisa',
  license: undefined,
  version: '1.0.0',
  desciption: '',


  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  background: undefined,
  lines: [],
  framesCounter: 0,
  keys: {
    player: {
      ARROW_LEFT: " ArrowLeft",
      ARROW_RIGHT: "ArrowRight"
    }
  },



  init() {
       console.log("Init")

    this.setContext()
     
    this.setDimensions()
    this.drawAll()
    
    this.createAll()
    this.createLine()
    
    this.start()


    //this.start()
  },

  setContext() {
    this.canvasDOM = document.querySelector("#myCanvas")
    this.ctx = this.canvasDOM.getContext("2d")
    
    
  },

  setDimensions() {
      
    this.canvasSize.width = window.innerWidth
    this.canvasSize.height = window.innerHeight


    this.canvasDOM.setAttribute("width", this.canvasSize.width)
    this.canvasDOM.setAttribute("height", this.canvasSize.height)
  },


  start(){
      this.intervalId = setInterval(()=> {
          this.framesCounter ++;
          this.drawAll();
          
          if(this.framesCounter % 20 == 0) this.createLine()
          
          console.log(this.lines)
          this.moveAll();
          this.increaseAll();

      },50)


  },


//DRAWS
drawAll(){
this.drawBackground()
this.drawLines()

},

drawBackground(){
  this.ctx.fillStyle = "black"
  this.ctx.fillRect(0, 0,this.canvasSize.width, this.canvasSize.height)

},

drawLines(){
  
this.lines.forEach(line=> line.draw() )

},

//CREATES
createAll(){




},



createLine(){
this.lines.push(new Line(this.ctx,0,200 , this.canvasSize.width,200 , 0, 20,5))


},

//MOVES
moveAll(){
this.moveLines()
},

moveLines(){
  this.lines.forEach(line=> line.move())
},

increaseAll(){
this.increaseLines();

},



increaseLines(){
  this.lines.forEach(line=> line.increaseLineWidth())
}



// createBackground(){
// this.background = new Background(this.ctx, 0 , 0 , 500, 500)  
// },







}
