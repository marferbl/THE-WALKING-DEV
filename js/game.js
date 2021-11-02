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
  linesCenter: [],
  zombie: undefined,
  vaccines: [],
  doctors: [],
  normies: [],
  framesNormies:60,
  framesDoctors:130,
  framesVaccines:100,
  framesCounter: 0,
  normieCounter: 0,
  lifeCounter: 5,
  collisionOccured: false,
  sky:undefined,
  score:undefined,
 keys: {
    
       zombie: {
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight" }
    
  },


  arrayDesvitation: ["left","left8","right8" , "center" , "right"],



  init() {
       console.log("Init")

    this.setContext()
    
    this.setDimensions()
    // this.createLine()
     //this.createLineCenter()
    this.createSky();
    this.createRoad()
    this.createAll()
    this.setListeners()


   
 
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


  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;

      if (this.framesCounter > 2000) {
        this.framesCounter = 0
      }

       this.createScore()
      


         if (this.framesCounter % 50 == 0) {
        this.createLineCenter();
             }

    
      
         if (this.framesCounter % 40 == 0) {
            this.createLine();
    
      }

          if (this.framesCounter % this.framesNormies == 0) this.createNormies(this.arrayDesvitation[this.randomNumberDesviation()])
          if (this.framesCounter % this.framesDoctors == 0) this.createDoctors(this.arrayDesvitation[this.randomNumberDesviation()])
          if (this.framesCounter % this.framesVaccines == 0) this.createVaccines(this.arrayDesvitation[this.randomNumberDesviation()])
            
         




          if (this.framesCounter % 170 == 0) {
            if(this.framesNormies > 40) {this.framesNormies-= 30 } else {this.framesNormies = 70}
            if(this.framesDoctors >50)  {this.framesDoctors -= 30} else {this.framesDoctors = 50}
            if(this.framesVaccines > 50) {this.framesVaccines -=30 } else {this.framesVaccines = 50}
                        
           
           
          }







      this.clearScreen()
      this.drawAll();
       this.increaseAll();
     // console.log(this.normies)
      this.moveAll();
      
      this.clearObstacles();
     
      if (this.isCollisionNormie()){
        
        
        this.normieCounter++ 
        console.log("normie" + this.normieCounter)
        //this.score.normiesCounter++ 
        
        
          
      };

        if (this.isCollisionVaccine()){
        this.lifeCounter--
        console.log(this.lifeCounter)
          
      };

        if (this.isCollisionDoctor()){
        this.normieCounter--
        
          
      };
      if(this.lifeCounter == 0 || this.normieCounter <0){ this.gameOver()}

    }, 1000/55) //TODO ajustar frames y velocidades acorde
  },

  // CALCULAR RANDOM 

  // randomNumber() {
  //   let randomNumber = Math.floor(Math.random() * (20 - 0 + 1) + 0)
  //   return randomNumber
  // },
   randomNumberDesviation() {
    let randomNumber = Math.floor(Math.random() * (4 - 0 + 1) + 0)
    return randomNumber
  },


  

  //DRAWS
  drawAll() {
    this.drawSky()
     
    this.drawGreen()
    this.drawLines()
    
    this.drawRoad()
    this.drawLinesCenter()
    this.drawNormies();
    this.drawVaccines();
    this.drawDoctors();
    this.drawZombie();
    this.drawScore();

  },



drawGreen(){
  this.ctx.fillStyle = "#663300"
  this.ctx.fillRect(0, 213,this.canvasSize.width, this.canvasSize.height)

},

drawLines(){
  
this.lines.forEach(line=> line.draw() )

},

drawLinesCenter(){
  this.linesCenter.forEach(line => line.draw())
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

  drawNormies() {
    this.normies.forEach(normie => normie.draw())

  },

  drawVaccines() {
    this.vaccines.forEach(vaccine => vaccine.draw())

  },

  drawDoctors() {
    this.doctors.forEach(doctor => doctor.draw())

  },
  drawScore() {
    this.score.draw()
  },



//CREATES



  //CREATES
  createAll() {
    this.createNormies()
    this.createDoctors()
    this.createVaccines()
    this.createZombie()
    this.createScore()
   
  },

  createNormies(param) {
  
    if (param == "left15") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -10, "man.png"))
    } else if (param == "right15") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 10, "man.png"))
    } else if (param == "left8") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -4, "man.png"))
    } else if (param == "right8") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 4, "man.png"))
    } else if (param == "center") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "man.png"))
    } else {
      null
    }

  },

  createVaccines(param) {
    if (param == "left15") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -10, "vaccine.png"))
    } else if (param == "right15") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 10, "vaccine.png"))
    }  else if (param == "letf8") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -4, "vaccine.png"))
    } else if (param == "rigth8") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 4, "vaccine.png"))
    }else if (param == "center") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "vaccine.png"))
    } else {
      null
    }

  },

  createDoctors(param) {
    if (param == "left") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -10, "hazmat.png"))
    } else if (param == "right") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 10, "hazmat.png"))
    } else if (param == "left8") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -4, "hazmat.png"))
    } else if (param == "right8") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 4, "hazmat.png"))
    } else if (param == "center") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "hazmat.png"))
    }else {
      null
    }

},




createZombie() {
    this.zombie = new Zombie(this.canvasSize.width, this.ctx, this.canvasSize.width / 2 - 100, this.canvasSize.height - 350, 200, 350, "zombie.png")
  },

  createLine() {
    this.lines.push(new Line(this.ctx, 0, 250, this.canvasSize.width, 250, 0, 6, 20))
      },
  
  createLineCenter() {
    this.linesCenter.push(new LineCenter(this.ctx, this.canvasSize.width/2+25, 220, 10, 25, 10))
      },

createRoad(){
this.road = new Road(this.ctx,-300,210, this.canvasSize.width+600,900,"centerRoad.png")

},

createSky(){
  this.sky= new Sky(this.ctx,0,0,this.canvasSize.width, 0,"sky-game.png",1)
},

  createSky() {
    this.sky = new Sky(this.ctx, 0, 0, this.canvasSize.width, 700, "sky-game.png", 2)
  },

createScore(){
  this.score = new Score(this.ctx, 100, 100,this.normieCounter)
},

  //MOVES
  moveAll() {
    this.moveLines()
    this.moveLinesCenter()
    this.moveSky()
    this.moveZombie()
    this.moveNormies()
    this.moveVaccines()
    this.moveDoctors()
  },

moveLines(){
  this.lines.forEach(line=> line.move())
},

moveLinesCenter(){
  this.linesCenter.forEach(line=> line.move())
},
 moveZombie() {
    this.zombie.move()
  },
moveSky(){
  this.sky.move();
  
},

  moveNormies() {
    this.normies.forEach(normie => normie.move())

  },

  moveVaccines() {
    this.vaccines.forEach(vaccine => vaccine.move())

  },

  moveDoctors() {
    this.doctors.forEach(doctor => doctor.move())

  },



  moveSky() {
    this.sky.move();

  },


  // CLEAR 

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  },

  clearObstacles() {
    this.clearNormies()
    this.clearVaccines()
    this.clearDoctors()
  },


  clearNormies() {
    this.normies = this.normies.filter(normie => {
      if (normie.pos.y < this.canvasSize.height - 350) {
        return true
      }
    })
  },

  clearVaccines() {
    this.vaccines = this.vaccines.filter(vaccine => {
      if (vaccine.pos.y < this.canvasSize.height - 350) {
        return true
      }
    })
  },

  clearDoctors() {
    this.doctors = this.doctors.filter(doctor => {
      if (doctor.pos.y < this.canvasSize.height - 350) {
        return true
      }
    })
  },

  // increase
  increaseAll() {
    this.increaseLines();
    this.increaseObstacles()
  },


increaseLines(){
  this.lines.forEach(line=> line.increaseLineWidth())
},

//LISTENERS
  increaseObstacles() {
    this.normies.forEach(normie => normie.increaseSize())
    this.vaccines.forEach(vaccine => vaccine.increaseSize())
    this.doctors.forEach(doctor => doctor.increaseSize())
  },



  // LISTENERS

setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.zombie.ARROW_LEFT) {
        this.zombie.moveLeft(this.canvasSize.width)
        
      }
      if (e.key === this.keys.zombie.ARROW_RIGHT) {
        this.zombie.moveRight(this.canvasSize.width)
       
      }
    }
  },



// createBackground(){
// this.background = new Background(this.ctx, 0 , 0 , 500, 500)  
// },


// COLISIONES

isCollisionNormie() {
    return this.normies.some(normie => {
      return (
        this.zombie.pos.x + this.zombie.size.width > normie.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < normie.pos.x + normie.size.width &&         //lado izq del player lado drch del obs
        this.zombie.pos.y*1.53 < normie.size.height+ normie.pos.y //lado de abajo del player lado de arriba del obs
      )
    })


},

isCollisionVaccine() {
    return this.vaccines.some(vaccine => {
      return (
        this.zombie.pos.x + this.zombie.size.width > vaccine.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < vaccine.pos.x + vaccine.size.width &&         //lado izq del player lado drch del obs
        this.zombie.pos.y*1.53 < vaccine.size.height+ vaccine.pos.y //lado de abajo del player lado de arriba del obs
      )
    })


}, 

isCollisionDoctor() {
    return this.doctors.some(doctor => {
      return (
        this.zombie.pos.x + this.zombie.size.width > doctor.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < doctor.pos.x + doctor.size.width &&         //lado izq del player lado drch del obs
        this.zombie.pos.y*1.53 < doctor.size.height+ doctor.pos.y //lado de abajo del player lado de arriba del obs
      )
    })


},

gameOver(){
   clearInterval(this.intervalId)}
}







