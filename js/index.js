window.onload = () => {
  document.querySelector(".start-button").onclick = () => {
    document.querySelector(".bodyDiv").style.display = "none";
    audioIntro.play();
    startGame();
  };
  function startGame() {
    audioIntro.pause();
    game.init();
  }
};

let audioIntro = new Audio("./images/horror-game.mp3");
