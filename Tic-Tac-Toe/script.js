"use strict";

const cells = document.querySelectorAll(".cell");
console.log(cells);

const tieScore = document.getElementById("tie-score");
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const playerXIndicator = document.getElementById("player-x");
const playerOIndicator = document.getElementById("player-o");
const resultDisplay = document.getElementById("result");
const resetScoreBtn = document.getElementById("reset-score");
const resetBoardBtn = document.getElementById("reset-board");

const gameBoard = (() => {
  const playerX = { name: "Player X", symbol: "X", color: "" };
  const playerO = { name: "Player O", symbol: "O", color: "" };
  xScore.textContent = 0;
  oScore.textContent = 0;
  tieScore.textContent = 0;
  let currentPlayer = playerX;
  let winner = -1;

  const board = Array(9).fill("");
  const winningLines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const checkWin = (symbol) => {
    console.log("Check Win");
    winner = winningLines.findIndex((line) => line.every((index) => board[index] === symbol));
    console.log(winner);
    return winner;
  };

  const highlightRow = () => {
    cells.forEach((cell) => {
      cell.classList.remove("win");
    });

    winningLines[winner].forEach((cellIndex) => {
      cells[cellIndex].classList.add("win");
    });
  };

  const handleClick = (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if (winner > 0) return;

    if (board[index] === "") {
      board[index] = currentPlayer.symbol;
      cell.textContent = currentPlayer.symbol;
      console.log(board);
      checkWin(currentPlayer.symbol);

      //Display winner, Prevent anymore clicks on empty cells, Highlight winning row Update Score or Tie
      if (winner !== -1) {
        resultDisplay.textContent = `${currentPlayer.name} wins!`;
        resultDisplay.classList.add("winText");
        currentPlayer === playerX ? xScore.textContent++ : oScore.textContent++;
        highlightRow();
      } else if (winner === -1 && board.every((cell) => cell !== "")) {
        resultDisplay.textContent = `Tie Game!`;
        resultDisplay.classList.add("winText");
        tieScore.textContent++;
      }

      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);

    cell.addEventListener("mouseover", (e) => {
      if (board[e.target.dataset.index] === "") {
        e.target.textContent = currentPlayer.symbol;
      }
    });

    cell.addEventListener("mouseout", (e) => {
      if (board[e.target.dataset.index] === "") {
        e.target.textContent = "";
      }
    });
  });

  return {};
})();
