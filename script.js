const cells =
  document.querySelectorAll(".cell");

const statusText =
  document.getElementById("status");

const popup =
  document.getElementById("popup");

const winnerText =
  document.getElementById("winnerText");

/* Game Variables */

let currentPlayer = "X";

let gameActive = true;

let gameMode = "person";

let gameState = [

  "", "", "",
  "", "", "",
  "", "", ""

];

const winningConditions = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];

/* Select Mode */

function setMode(mode){

  gameMode = mode;

  restartGame();

  if(gameMode === "robot"){

    statusText.textContent =
      "🤖 Robot Mode Enabled";

  } else {

    statusText.textContent =
      "👥 Two Player Mode";

  }

}

/* Handle Click */

function handleCellClick(e){

  const clickedCell = e.target;

  const index =
    clickedCell.getAttribute("data-index");

  if(
    gameState[index] !== "" ||
    !gameActive
  ){
    return;
  }

  makeMove(index, currentPlayer);

  if(
    gameMode === "robot" &&
    gameActive &&
    currentPlayer === "O"
  ){

    statusText.textContent =
      "🤖 Robot Thinking...";

    setTimeout(robotMove, 500);

  }

}

/* Make Move */

function makeMove(index, player){

  gameState[index] = player;

  cells[index].textContent = player;

  cells[index].classList.add(
    player.toLowerCase()
  );

  checkWinner();

  if(gameActive){

    currentPlayer =
      currentPlayer === "X"
      ? "O"
      : "X";

    statusText.textContent =
      `Player ${currentPlayer} Turn`;

  }

}

/* Robot Move */

function robotMove(){

  let emptyCells = [];

  gameState.forEach((cell, index) => {

    if(cell === ""){
      emptyCells.push(index);
    }

  });

  if(emptyCells.length === 0){
    return;
  }

  const randomIndex =

    emptyCells[
      Math.floor(
        Math.random() * emptyCells.length
      )
    ];

  makeMove(randomIndex, "O");

}

/* Check Winner */

function checkWinner(){

  let roundWon = false;

  for(
    let i = 0;
    i < winningConditions.length;
    i++
  ){

    const [a,b,c] =
      winningConditions[i];

    if(
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ){

      roundWon = true;

      break;

    }

  }

  if(roundWon){

    gameActive = false;

    if(
      gameMode === "robot" &&
      currentPlayer === "O"
    ){

      winnerText.textContent =
        "🤖 Robot Wins!";

    } else {

      winnerText.textContent =
        `🏆 Player ${currentPlayer} Wins!`;

    }

    popup.style.display = "flex";

    return;

  }

  if(!gameState.includes("")){

    gameActive = false;

    winnerText.textContent =
      "🤝 It's A Draw!";

    popup.style.display = "flex";

  }

}

/* Restart */

function restartGame(){

  currentPlayer = "X";

  gameActive = true;

  gameState = [

    "", "", "",
    "", "", "",
    "", "", ""

  ];

  popup.style.display = "none";

  statusText.textContent =
    "Player X Turn";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o"
    );

  });

}

/* Event Listeners */

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});
