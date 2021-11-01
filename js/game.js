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
   zombie: undefined,
  lines: [],
  framesCounter: 0,
  sky:undefined,
 keys: {
    
       zombie: {
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight" }
    
  },



  init() {
       console.log("Init")

    this.setContext()
    
    this.setDimensions()
      this.createSky(); 
      this.createRoad()
       this.createAll()
   
      this.setListeners( )
    
    
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
          
          if(this.framesCounter % 8 == 0)     this.createLine()
          
          
          this.moveAll();
          this.increaseAll();

      },50)


  },


//DRAWS
drawAll(){
  this.drawSky();
this.drawGreen()
this.drawLines()
this.drawRoad()
   this.drawZombie();

},

drawGreen(){
  this.ctx.fillStyle = "#8FC04C"
  this.ctx.fillRect(0, 213,this.canvasSize.width, this.canvasSize.height)

},

drawLines(){
  
this.lines.forEach(line=> line.draw() )

},

drawZombie() {
this.zombie.draw();
  },
drawRoad(){
this.road.draw();

},
drawSky(){
this.sky.draw();
},

//CREATES
createAll(){
this.createZombie();



},



createLine(){
this.lines.push(new Line(this.ctx,0,200 , this.canvasSize.width,200 , 0, 20,5))


},
createZombie() {
    this.zombie = new Zombie(this.canvasSize.width, this.ctx, this.canvasSize.width / 2 - 100, this.canvasSize.height - 350, 200, 350, "zombie.png")
  },


createRoad(){
this.road = new Road(this.ctx,0,210, this.canvasSize.width,750,"carreteraChunga.png")

},

createSky(){
  this.sky= new Sky(this.ctx,0,0,this.canvasSize.width, 700,"sky-game.png",1)
},

//MOVES
moveAll(){
this.moveLines()
this.moveSky();
 this.moveZombie()

},

moveLines(){
  this.lines.forEach(line=> line.move())
},
 moveZombie() {
    this.zombie.move()
  },
moveSky(){
  this.sky.move();
  
},

increaseAll(){
this.increaseLines();

},



increaseLines(){
  this.lines.forEach(line=> line.increaseLineWidth())
},

//LISTENERS

setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.zombie.ARROW_LEFT) {
        this.zombie.moveLeft(this.canvasSize.width)
        console.log("move left")
      }
      if (e.key === this.keys.zombie.ARROW_RIGHT) {
        this.zombie.moveRight(this.canvasSize.width)
        console.log("move right")
      }
    }
  },



// createBackground(){
// this.background = new Background(this.ctx, 0 , 0 , 500, 500)  
// },







}








