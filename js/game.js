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
  road:undefined,
  lines: [],
  framesCounter: 0,
  sky:undefined,
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
 this.createRoad()
 this.createSky();
    this.createAll()
    this.drawAll()
    
    
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
          
          if(this.framesCounter % 3 == 0)     this.createLine()
          
          console.log(this.lines)
          this.moveAll();
          this.increaseAll();

      },50)


  },


//DRAWS
drawAll(){
this.drawBackground()
this.drawLines()
this.drawRoad()
this.drawSky();
},

drawBackground(){
  this.ctx.fillStyle = "#8FC04C"
  this.ctx.fillRect(0, 0,this.canvasSize.width, this.canvasSize.height)

},

drawLines(){
  
this.lines.forEach(line=> line.draw() )

},


drawRoad(){
this.road.draw();

},
drawSky(){
this.sky.draw();
},

//CREATES
createAll(){




},



createLine(){
this.lines.push(new Line(this.ctx,0,200 , this.canvasSize.width,200 , 0, 15,15))


},


createRoad(){
this.road = new Road(this.ctx,0,210, this.canvasSize.width,750,"carreteraChunga.png")

},

createSky(){
  this.sky= new Sky(this.ctx,0,0,this.canvasSize.width, 212,"sky.jpg")
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







  
