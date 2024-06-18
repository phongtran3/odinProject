"use strict";

const cells = document.querySelectorAll(".cell");

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
    winner = winningLines.findIndex((line) => line.every((index) => board[index] === symbol));
    return winner;
  };

  const highlightRow = () => {
    cells.forEach((cell) => {
      cell.classList.remove("win");
    });

    if (winner !== -1) {
      winningLines[winner].forEach((cellIndex) => {
        cells[cellIndex].classList.add("win");
      });
    }
  };

  const updatePlayerIndicator = () => {
    if (currentPlayer === playerX) {
      playerXIndicator.classList.remove("not-active");
      playerOIndicator.classList.add("not-active");
    } else {
      playerOIndicator.classList.remove("not-active");
      playerXIndicator.classList.add("not-active");
    }
  };

  const handleClick = (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if (winner > 0) return;

    if (board[index] === "") {
      board[index] = currentPlayer.symbol;
      cell.textContent = currentPlayer.symbol;
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
      } else {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        updatePlayerIndicator();
      }
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

  const resetBoard = () => {
    board.fill("");
    cells.forEach((cell) => (cell.textContent = ""));
    winner = -1;
    highlightRow();
    resultDisplay.textContent = "";
  };

  const resetScore = () => {
    console.log("reset score");
    xScore.textContent = 0;
    oScore.textContent = 0;
    tieScore.textContent = 0;
  };

  //Reset Score
  resetScoreBtn.addEventListener("click", () => {
    resetScore();
    resetBoard();
    currentPlayer = playerX;
    updatePlayerIndicator();
  });

  //Reset Board
  resetBoardBtn.addEventListener("click", () => {
    resetBoard();
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    updatePlayerIndicator();
  });

  return {};
})();
