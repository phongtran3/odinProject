"use strict";

const cells = document.querySelectorAll(".cell");
console.log(cells);

const tieScore = document.getElementById("tie-score");
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const resultDisplay = document.getElementById("result");
const resetScoreBtn = document.getElementById("reset-score");
const resetBoardBtn = document.getElementById("reset-board");

const gameBoard = (() => {
  const playerX = { name: "Player X", symbol: "X", color: "" };
  const playerO = { name: "Player O", symbol: "O", color: "" };

  let currentPlayer = playerX;

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

  const handleClick = (e) => {
    console.log(e.target);
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });

  return {};
})();
