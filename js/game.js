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
  road: undefined,
  lines: [],
  zombie: undefined,
  vaccines: [],
  doctors: [],
  normies: [],
  framesCounter: 0,
  sky: undefined,
  keys: {
    zombie: {
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight"
    }
  },



  init() {
    console.log("Init")

    this.setContext()
    this.setDimensions()
    this.createSky();
    this.createRoad()
    this.createAll()
    this.setListeners()


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


  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;


      console.log(this.randomNumber())
      if (this.framesCounter % 8 == 0) this.createLine()
      // NORMIES CREATE

      if (this.framesCounter % (80 + this.randomNumber()) == 0) this.createNormies("left")
      if (this.framesCounter % (80 + this.randomNumber()) == 0) this.createNormies("right")
      if (this.framesCounter % (70 + this.randomNumber()) == 0) this.createNormies("center")
      // DOCTORS CREATE
      if (this.framesCounter % (120 + this.randomNumber()) == 0) this.createDoctors("left")
      if (this.framesCounter % (100 + this.randomNumber()) == 0) this.createDoctors("right")
      if (this.framesCounter % (90 + this.randomNumber()) == 0) this.createDoctors("center")
      // VACCINES CREATE
      if (this.framesCounter % (180 + this.randomNumber()) == 0) this.createVaccines("left")
      if (this.framesCounter % (160 + this.randomNumber()) == 0) this.createVaccines("right")
      if (this.framesCounter % (120 + this.randomNumber()) == 0) this.createVaccines("center")
      //
      this.clearScreen()
      this.drawAll();
      console.log(this.normies)
      this.moveAll();
      this.increaseAll();
      this.clearObstacles();

    }, 80)
  },

  // CALCULAR RANDOM 

  randomNumber() {
    let randomNumber = Math.floor(Math.random() * (20 - 0 + 1) + 0)
    return randomNumber
  },

  // random6080() {
  //   let random6080 = Math.floor(Math.random() * (80 - 60 + 1) + 60)
  //   return random6080
  // },

  // random90120() {
  //   let random90120 = Math.floor(Math.random() * (120 - 90 + 1) + 90)
  //   return random90120
  // },

  // random110180() {
  //   let random110180 = Math.floor(Math.random() * (180 - 110 + 1) + 110)
  //   return random110180
  // },

  //DRAWS
  drawAll() {
    this.drawSky()
    this.drawGreen()
    this.drawLines()
    this.drawRoad()
    this.drawNormies();
    this.drawVaccines();
    this.drawDoctors();
    this.drawZombie();

  },

  drawGreen() {
    this.ctx.fillStyle = "#8FC04C"
    this.ctx.fillRect(0, 213, this.canvasSize.width, this.canvasSize.height)

  },

  drawLines() {

    this.lines.forEach(line => line.draw())

  },

  drawZombie() {
    this.zombie.draw();
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


  drawRoad() {
    this.road.draw();

  },
  drawSky() {
    this.sky.draw();
  },

  //CREATES
  createAll() {
    this.createNormies()
    this.createDoctors()
    this.createVaccines()
    this.createZombie()
  },

  createNormies(param) {
    if (param == "left") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -15, "man.png"))
    } else if (param == "right") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 15, "man.png"))
    } else if (param == "center") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "man.png"))
    } else {
      null
    }

  },

  createVaccines(param) {
    if (param == "left") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -15, "vaccine.png"))
    } else if (param == "right") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 15, "vaccine.png"))
    } else if (param == "center") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "vaccine.png"))
    } else {
      null
    }

  },

  createDoctors(param) {
    if (param == "left") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, -15, "hazmat.png"))
    } else if (param == "right") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 15, "hazmat.png"))
    } else if (param == "center") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 20, 35, 0, "hazmat.png"))
    } else {
      null
    }

  },

  createZombie() {
    this.zombie = new Zombie(this.canvasSize.width, this.ctx, this.canvasSize.width / 2 - 100, this.canvasSize.height - 350, 200, 350, "zombie.png")
  },

  createLine() {
    this.lines.push(new Line(this.ctx, 0, 240, this.canvasSize.width, 240, 0, 20, 5))
  },


  createRoad() {
    this.road = new Road(this.ctx, 0, 210, this.canvasSize.width, 750, "carreteraChunga.png")

  },

  createSky() {
    this.sky = new Sky(this.ctx, 0, 0, this.canvasSize.width, 700, "sky-game.png", 1)
  },

  //MOVES
  moveAll() {
    this.moveLines()
    this.moveSky()
    this.moveZombie()
    this.moveNormies()
    this.moveVaccines()
    this.moveDoctors()
  },

  moveZombie() {
    this.zombie.move()
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


  moveLines() {
    this.lines.forEach(line => line.move())
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
      if (normie.pos.y < this.canvasSize.height - 230) {
        return true
      }
    })
  },

  clearVaccines() {
    this.vaccines = this.vaccines.filter(vaccine => {
      if (vaccine.pos.y < this.canvasSize.height - 230) {
        return true
      }
    })
  },

  clearDoctors() {
    this.doctors = this.doctors.filter(doctor => {
      if (doctor.pos.y < this.canvasSize.height - 230) {
        return true
      }
    })
  },

  // increase
  increaseAll() {
    this.increaseLines();
    this.increaseObstacles()
  },

  increaseLines() {
    this.lines.forEach(line => line.increaseLineWidth())
  },

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








