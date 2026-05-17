const cells =
  document.querySelectorAll(".cell");

const statusText =
  document.getElementById("status");

const popup =
  document.getElementById("popup");

const winnerText =
  document.getElementById("winnerText");

let humanPlayer = "X";

let robotPlayer = "O";

let currentPlayer = "X";

let gameActive = true;

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

/* Choose Player */

function choosePlayer(player){

  humanPlayer = player;

  robotPlayer =
    player === "X" ? "O" : "X";

  restartGame();

  if(robotPlayer === "X"){

    currentPlayer = "X";

    statusText.textContent =
      "🤖 Robot Thinking...";

    setTimeout(robotMove, 700);

  }

}

/* Handle Click */

function handleCellClick(e){

  const clickedCell = e.target;

  const index =
    clickedCell.getAttribute("data-index");

  if(
    gameState[index] !== "" ||
    !gameActive ||
    currentPlayer !== humanPlayer
  ){
    return;
  }

  makeMove(index, humanPlayer);

  if(gameActive){

    currentPlayer = robotPlayer;

    statusText.textContent =
      "🤖 Robot Thinking...";

    setTimeout(robotMove, 600);

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

  makeMove(randomIndex, robotPlayer);

  if(gameActive){

    currentPlayer = humanPlayer;

    statusText.textContent =
      `Player ${humanPlayer} Turn`;

  }

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

    if(currentPlayer === robotPlayer){

      winnerText.textContent =
        "🤖 Robot Wins!";

    } else {

      winnerText.textContent =
        `🏆 Player ${humanPlayer} Wins!`;

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

  gameActive = true;

  gameState = [

    "", "", "",
    "", "", "",
    "", "", ""

  ];

  popup.style.display = "none";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o"
    );

  });

  currentPlayer = "X";

  statusText.textContent =
    `Player ${currentPlayer} Turn`;

}

/* Event Listeners */

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});
