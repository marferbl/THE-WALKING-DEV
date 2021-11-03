const game = {
  title: "The walking dev",
  author: "Marcos y Lisa",
  license: undefined,
  version: "1.0.0",
  desciption: "",

  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  background: undefined,
  road: undefined,
  zombie: undefined,
  lines: [],
  linesCenter: [],
  zombie: undefined,
  vaccines: [],
  doctors: [],
  normies: [],
  brains: [],
  framesNormies: 70,
  framesDoctors: 180,
  framesVaccines: 150,
  framesCounter: 0,
  normieCounter: 0,
  lifeCounter: 5,
  collisionOccured: false,
  sky: undefined,
  score: undefined,
  lifes: [],

  keys: {
    zombie: {
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight",
    },
  },

  arrayDesvitation: ["left", "left8", "right8", "center", "right"],

  init() {
    console.log("Init");

    this.setContext();

    this.setDimensions();
    // this.createLine()
    //this.createLineCenter()
    this.createSky();
    this.createRoad();
    this.createAll();
    this.setListeners();

    this.start();

    //this.start()
  },

  setContext() {
    this.canvasDOM = document.querySelector("#myCanvas");
    this.ctx = this.canvasDOM.getContext("2d");
  },

  setDimensions() {
    this.canvasSize.width = window.innerWidth;
    this.canvasSize.height = window.innerHeight;

    this.canvasDOM.setAttribute("width", this.canvasSize.width);
    this.canvasDOM.setAttribute("height", this.canvasSize.height);
  },

  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;

      if (this.framesCounter > 2000) {
        this.framesCounter = 0;
      }

      this.createScore();

      if (this.framesCounter % 20 == 0) {
        this.createLineCenter();
      }

      if (this.framesCounter % 140 == 0) {
        this.createBrains(this.arrayDesvitation[this.randomNumberDesviation()]);
      }

      if (this.framesCounter % 30 == 0) {
        this.createLine();
      }

      if (this.framesCounter % this.framesNormies == 0) this.createNormies(this.arrayDesvitation[this.randomNumberDesviation()]);
      if (this.framesCounter % this.framesDoctors == 0) this.createDoctors(this.arrayDesvitation[this.randomNumberDesviation()]);
      if (this.framesCounter % this.framesVaccines == 0)
        this.createVaccines(this.arrayDesvitation[this.randomNumberDesviation()]);

      if (this.framesCounter % 80 == 0) {
        if (this.framesNormies > 40) {
          this.framesNormies -= 10;
        } else {
          this.framesNormies = 40;
        }
        if (this.framesDoctors > 50) {
          this.framesDoctors -= 15;
        } else {
          this.framesDoctors = 30;
        }
        if (this.framesVaccines > 50) {
          this.framesVaccines -= 15;
        } else {
          this.framesVaccines = 30;
        }
      }

      this.clearScreen();
      this.drawAll();
      this.increaseAll();
      // console.log(this.normies)
      this.moveAll();

      this.clearObstacles();

      if (this.isCollisionNormie()) {
        this.normieCounter++;
        console.log("normie" + this.normieCounter);
        //this.score.normiesCounter++
      }

      if (this.isCollisionVaccine()) {
        this.lifeCounter--;
        this.lifes.pop();

        console.log(this.lifeCounter);
        console.log(this.lifes);
      }

      if (this.isCollisionDoctor()) {
        this.normieCounter--;
      }

      if (this.isCollisionBrain()) {
        let chosen = undefined;

        console.log(this.lifes, this.lifeCounter);
        switch (this.lifeCounter) {
          case 4:
            chosen = 50;
            break;
          case 3:
            chosen = 100;
            break;
          case 2:
            chosen = 150;
            break;
          case 1:
            chosen = 200;
            break;
        }
        console.log(chosen);
        this.lifeCounter++;
        if (this.lifes.length < 5) {
          this.lifes.push(new Life(this.ctx, this.canvasSize.width - chosen, 100, 25, 30, this.lifeCounter, "brain.png"));
        }
        this.lifes.forEach((life) => life.draw());
        console.log(this.lifes);
      }
      if (this.lifeCounter == 0 || this.normieCounter < 0) {
        this.gameOver();
      }
    }, 1000 / 40); //TODO ajustar frames y velocidades acorde
  },

  // CALCULAR RANDOM

  // randomNumber() {
  //   let randomNumber = Math.floor(Math.random() * (20 - 0 + 1) + 0)
  //   return randomNumber
  // },
  randomNumberDesviation() {
    let randomNumber = Math.floor(Math.random() * (4 - 0 + 1) + 0);
    return randomNumber;
  },

  //DRAWS
  drawAll() {
    this.drawSky();

    this.drawGreen();
    this.drawLines();

    this.drawRoad();
    this.drawLinesCenter();
    this.drawNormies();
    this.drawVaccines();
    this.drawDoctors();
    this.drawBrains();
    this.drawZombie();
    this.drawScore();
    this.drawLifes();
  },

  drawGreen() {
    this.ctx.fillStyle = "#331a00";
    this.ctx.fillRect(0, 213, this.canvasSize.width, this.canvasSize.height);
  },

  drawLines() {
    this.lines.forEach((line) => line.draw());
  },

  drawLinesCenter() {
    this.linesCenter.forEach((line) => line.draw());
  },

  drawZombie() {
    this.zombie.draw(this.framesCounter);
  },
  drawRoad() {
    this.road.draw();
  },
  drawSky() {
    this.sky.draw();
  },
  drawLifes() {
    this.lifes.forEach((life) => life.draw());
  },

  drawNormies() {
    this.normies.forEach((normie) => normie.draw(this.framesCounter));
  },

  drawVaccines() {
    this.vaccines.forEach((vaccine) => vaccine.draw());
  },

  drawDoctors() {
    this.doctors.forEach((doctor) => doctor.draw(this.framesCounter));
  },
  drawBrains() {
    this.brains.forEach((brain) => brain.draw(this.framesCounter));
  },
  drawScore() {
    this.score.draw();
  },

  //CREATES

  //CREATES
  createAll() {
    this.createNormies();
    this.createDoctors();
    this.createVaccines();
    this.createBrains();
    this.createZombie();
    this.createScore();
    this.createLifes();
  },

  createNormies(param) {
    if (param == "left") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 16, 28, -9, "rick_2.png"));
    } else if (param == "right") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 16, 28, 9, "rick_2.png"));
    } else if (param == "left8") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 16, 28, -4, "rick_2.png"));
    } else if (param == "right8") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 16, 28, 4, "rick_2.png"));
    } else if (param == "center") {
      this.normies.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 16, 28, 0, "rick_2.png"));
    } else {
      null;
    }
  },

  createVaccines(param) {
    if (param == "left") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 12, 20, -9, "vaccine_sprite1.png"));
    } else if (param == "right") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 12, 20, 9, "vaccine_sprite1.png"));
    } else if (param == "left8") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 12, 20, -4, "vaccine_sprite1.png"));
    } else if (param == "right8") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 12, 20, 4, "vaccine_sprite1.png"));
    } else if (param == "center") {
      this.vaccines.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 12, 20, 0, "vaccine_sprite1.png"));
    } else {
      null;
    }
  },

  createDoctors(param) {
    if (param == "left") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 28, 45, -9, "doctor_2.png"));
    } else if (param == "right") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 28, 45, 9, "doctor_2.png"));
    } else if (param == "left8") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 28, 45, -4, "doctor_2.png"));
    } else if (param == "right8") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 28, 45, 4, "doctor_2.png"));
    } else if (param == "center") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 28, 45, 0, "doctor_2.png"));
    } else {
      null;
    }
  },

  createBrains(param) {
    if (param == "left") {
      this.brains.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 5, 6, -9, "brain_2.png"));
    } else if (param == "right") {
      this.brains.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 5, 6, 9, "brain_2.png"));
    } else if (param == "left8") {
      this.doctors.push(new Obstacles(this.ctx, this.canvasSize.width / 2 - 10, 200, 5, 6, -4, "doctor_2.png"));
    }
  },

  createZombie() {
    this.zombie = new Zombie(
      this.canvasSize.width,
      this.ctx,
      this.canvasSize.width / 2 - 100,
      this.canvasSize.height - 350,
      215,
      300,
      "zombie3.png"
    );
  },
  createLifes() {
    console.log(this.lifes);
    this.lifes.push(new Life(this.ctx, this.canvasSize.width - 250, 100, 25, 30, this.lifeCounter, "brain.png"));
    this.lifes.push(new Life(this.ctx, this.canvasSize.width - 200, 100, 25, 30, this.lifeCounter, "brain.png"));
    this.lifes.push(new Life(this.ctx, this.canvasSize.width - 150, 100, 25, 30, this.lifeCounter, "brain.png"));
    this.lifes.push(new Life(this.ctx, this.canvasSize.width - 100, 100, 25, 30, this.lifeCounter, "brain.png"));
    this.lifes.push(new Life(this.ctx, this.canvasSize.width - 50, 100, 25, 30, this.lifeCounter, "brain.png"));
  },

  createLine() {
    this.lines.push(new Line(this.ctx, 0, 250, this.canvasSize.width, 250, 6, 10));
  },

  createLineCenter() {
    this.linesCenter.push(new LineCenter(this.ctx, this.canvasSize.width / 2 + 25, 220, 10, 25, 10));
  },

  createRoad() {
    this.road = new Road(this.ctx, -300, 210, this.canvasSize.width + 600, 900, "centerRoad.png");
  },

  createSky() {
    this.sky = new Sky(this.ctx, 0, 0, this.canvasSize.width, 0, "sky-game.png", 1);
  },

  createSky() {
    this.sky = new Sky(this.ctx, 0, 0, this.canvasSize.width, 700, "sky-night.png", 2);
  },

  createScore() {
    this.score = new Score(this.ctx, 100, 100, this.normieCounter);
  },

  //MOVES
  moveAll() {
    this.moveLines();
    this.moveLinesCenter();
    this.moveSky();
    this.moveZombie();
    this.moveBrains();
    this.moveNormies();
    this.moveVaccines();
    this.moveDoctors();
  },

  moveLines() {
    this.lines.forEach((line) => line.move());
  },

  moveLinesCenter() {
    this.linesCenter.forEach((line) => line.move());
  },
  moveZombie() {
    this.zombie.move();
  },
  moveSky() {
    this.sky.move();
  },

  moveNormies() {
    this.normies.forEach((normie) => normie.move());
  },

  moveVaccines() {
    this.vaccines.forEach((vaccine) => vaccine.move());
  },

  moveDoctors() {
    this.doctors.forEach((doctor) => doctor.move());
  },
  moveBrains() {
    this.brains.forEach((brain) => brain.move());
  },

  moveSky() {
    this.sky.move();
  },

  // CLEAR

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  clearObstacles() {
    this.clearNormies();
    this.clearVaccines();
    this.clearDoctors();
    this.clearBrains();
    // this.clearLifes();
  },

  clearNormies() {
    this.normies = this.normies.filter((normie) => {
      if (normie.pos.y < this.canvasSize.height - 350) {
        return true;
      }
    });
  },

  clearVaccines() {
    this.vaccines = this.vaccines.filter((vaccine) => {
      if (vaccine.pos.y < this.canvasSize.height - 350) {
        return true;
      }
    });
  },

  clearDoctors() {
    this.doctors = this.doctors.filter((doctor) => {
      if (doctor.pos.y < this.canvasSize.height - 350) {
        return true;
      }
    });
  },
  clearBrains() {
    this.brains = this.brains.filter((brain) => {
      if (brain.pos.y < this.canvasSize.height - 350) {
        return true;
      }
    });
  },
  clearLifes() {
    this.lifes = this.lifes.filter((lifes) => {
      if (this.lifes.length > 5) {
        return true;
      }
    });
  },

  // increase
  increaseAll() {
    this.increaseLines();
    this.increaseObstacles();
  },

  increaseLines() {
    this.lines.forEach((line) => line.increaseLineWidth());
  },

  //LISTENERS
  increaseObstacles() {
    this.normies.forEach((normie) => normie.increaseSize());
    this.vaccines.forEach((vaccine) => vaccine.increaseSize());
    this.doctors.forEach((doctor) => doctor.increaseSize());
    this.brains.forEach((brain) => brain.increaseSize());
  },

  // LISTENERS

  setListeners() {
    document.onkeydown = (e) => {
      if (e.key === this.keys.zombie.ARROW_LEFT) {
        this.zombie.moveLeft(this.canvasSize.width);
      }
      if (e.key === this.keys.zombie.ARROW_RIGHT) {
        this.zombie.moveRight(this.canvasSize.width);
      }
    };
  },

  // createBackground(){
  // this.background = new Background(this.ctx, 0 , 0 , 500, 500)
  // },

  // COLISIONES

  isCollisionNormie() {
    return this.normies.some((normie) => {
      return (
        this.zombie.pos.x + this.zombie.size.width > normie.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < normie.pos.x + normie.size.width && //lado izq del player lado drch del obs
        this.zombie.pos.y * 1.53 < normie.size.height + normie.pos.y //lado de abajo del player lado de arriba del obs
      );
    });
  },

  isCollisionVaccine() {
    return this.vaccines.some((vaccine) => {
      this.clearVaccines();
      return (
        this.zombie.pos.x + this.zombie.size.width > vaccine.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < vaccine.pos.x + vaccine.size.width && //lado izq del player lado drch del obs
        this.zombie.pos.y * 1.52 < vaccine.size.height + vaccine.pos.y
        //lado de abajo del player lado de arriba del obs
      );
    });
  },

  isCollisionDoctor() {
    return this.doctors.some((doctor) => {
      return (
        this.zombie.pos.x + this.zombie.size.width > doctor.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < doctor.pos.x + doctor.size.width && //lado izq del player lado drch del obs
        this.zombie.pos.y * 1.53 < doctor.size.height + doctor.pos.y //lado de abajo del player lado de arriba del obs
      );
    });
  },
  isCollisionBrain() {
    return this.brains.some((brain) => {
      return (
        this.zombie.pos.x + this.zombie.size.width > brain.pos.x && //lado drch del player lado izq del obs
        this.zombie.pos.x < brain.pos.x + brain.size.width && //lado izq del player lado drch del obs
        this.zombie.pos.y * 1.53 < brain.size.height + brain.pos.y //lado de abajo del player lado de arriba del obs
      );
    });
  },

  gameOver() {
    clearInterval(this.intervalId);
  },
};
