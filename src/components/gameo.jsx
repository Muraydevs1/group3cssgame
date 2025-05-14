"use client"

import { FaTrophy, FaRedo, FaHome, FaGamepad } from "react-icons/fa"

export default function GameOver({ score, moves, highScore, returnToMenu, startNewGame }) {
  const isNewHighScore = score >= highScore

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-teal-700 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center">Game Over</h2>

      <div className="flex flex-col items-center gap-2 w-full">
        <p className="text-xl">Your Score: {score}</p>
        <p className="text-xl flex items-center gap-2">
          <FaGamepad />
          Total Moves: {moves}
        </p>
        <p className="text-xl flex items-center gap-2">
          <FaTrophy className="text-yellow-400" />
          High Score: {highScore}
        </p>

        {isNewHighScore && (
          <div className="mt-2 py-2 px-4 bg-yellow-600 rounded-lg text-center animate-pulse">New High Score!</div>
        )}
      </div>

      <div className="flex flex-col w-full gap-3 mt-4">
        <button
          onClick={startNewGame}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-green-600 hover:bg-green-700 rounded-lg text-xl font-bold transition-colors"
        >
          <FaRedo /> Play Again
        </button>

        <button
          onClick={returnToMenu}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold transition-colors"
        >
          <FaHome /> Main Menu
        </button>
      </div>
    </div>
  )
}
