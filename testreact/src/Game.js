import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

function Game() {
  const [moves, setMoves] = useState(new Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  function gridClick(whichSquare) {
    if (isGameOver || moves[whichSquare] !== "") {
      return; 
    }

    const movesCopy = [...moves];
    movesCopy[whichSquare] = turn;
    setMoves(movesCopy);

    const nextTurn = turn === "X" ? "O" : "X";
    if (checkWinner(movesCopy, turn)) {
      setWinner(turn);
      setIsGameOver(true);
    } else if (!movesCopy.includes("")) {
      setWinner("Tie");
      setIsGameOver(true);
    } else if (nextTurn === "O") {
      setTimeout(() => computerMove(movesCopy), 500); 
    }

    setTurn(nextTurn);
  }

  function computerMove(movesCopy) {
    const emptySquares = movesCopy
      .map((val, idx) => (val === "" ? idx : null))
      .filter((val) => val !== null);

    if (emptySquares.length > 0) {
      const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      movesCopy[randomSquare] = "O";
      setMoves(movesCopy);

      if (checkWinner(movesCopy, "O")) {
        setWinner("O");
        setIsGameOver(true);
      } else if (!movesCopy.includes("")) {
        setWinner("Tie");
        setIsGameOver(true);
      } else {
        setTurn("X");
      }
    }
  }

  function checkWinner(board, player) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(
      (combo) => combo.every((index) => board[index] === player)
    );
  }

  function newGame() {
    setMoves(new Array(9).fill(""));
    setTurn("X");
    setWinner(null);
    setIsGameOver(false);
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <GameGrid moves={moves} click={gridClick} />
      <p>
        {isGameOver ? (
          winner === "Tie" ? (
            "Game Over: It's a Tie!"
          ) : (
            `Game Over: ${winner} Wins!`
          )
        ) : (
          <>
            Turn: <strong className={turn}>{turn}</strong>
          </>
        )}
      </p>
      <p>
        <button onClick={newGame}>New Game</button>
      </p>
    </>
  );
}

export default Game;
