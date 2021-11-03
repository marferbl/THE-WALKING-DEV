window.onload = () => {
  document.querySelector(".start-button").onclick = () => {
    document.querySelector(".bodyDiv").style.display = "none";
    startGame();
  };
  function startGame() {
    game.init();
  }
};
