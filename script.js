
const gameResultEl = document.getElementById("game-result");
const dialogueEl = document.getElementById("dialogue-box");
const newGameBtn = document.getElementById("new-game");
// conditions to determine the winner
const winnerArr = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

let circleTurn = true;
let clickCounter = 0;
let oArr = [];
let xArr = [];

document
  .getElementById("box-container")
  .addEventListener("click", clickHandler);

newGameBtn.addEventListener("click", newGame);

// this function handle clicks inside the box and execute the functions accordingly
function clickHandler(e) {
  // check if the box has been clicked
  if (e.target.textContent !== "" || !dialogueEl.classList.contains("hidden")) {
    return;
  }
  if (circleTurn) {
    oArr.push(parseInt(e.target.id));
  } else {
    xArr.push(parseInt(e.target.id));
  }
  circleTurn = !circleTurn;
  clickCounter++;
  console.log(oArr);
  console.log(xArr);
  checkWinner();
  drawTicTac(e);
}

// this function pops up dialogue box if someone wins or draw
function result(winner) {
  dialogueEl.classList.remove("hidden");
  if (winner === "D") {
    gameResultEl.textContent = `Draw!`;
  } else {
    gameResultEl.textContent = `${winner} wins!`;
  }
}

// this function checks if O or X wins or its draw by checking elements inside xArr or oArr and compare it to arrays inside winnerArr
function checkWinner() {
  function isWinner(arr, str) {
    return str.every((value) => arr.includes(value));
  }
  let oStr = oArr.sort((a, b) => a - b).join("");
  let xStr = xArr.sort((a, b) => a - b).join("");
  for (let subArrays of winnerArr) {
    if (isWinner(oStr, subArrays)) {
      result("O");
      return;
    } else if (isWinner(xStr, subArrays)) {
      result("X");
      return;
    }
  }
  if (clickCounter == 9) {
    result("D");
  }
}

// this function draws O or X which is visible in the browser inside the boxes
function drawTicTac(e) {
  let targetBox = document.getElementById(e.target.id);
  if (circleTurn) {
    targetBox.textContent = "X";
  } else {
    targetBox.textContent = "O";
  }
}


// this function resets everything and executes when new game button is clicked
function newGame() {
  oArr = [];
  xArr = [];
  circleTurn = true;
  clickCounter = 0;
  dialogueEl.classList.add("hidden");
  document.querySelectorAll(".boxes").forEach(box => {
    box.textContent = ""
  })
}
