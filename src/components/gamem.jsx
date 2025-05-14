"use client"

import { useState } from "react"
import { FaPlay, FaInfoCircle, FaCog, FaHourglassHalf, FaTrophy, FaFire } from "react-icons/fa"

export default function GameMenu({ startGame, highScore, toggleInstructions, toggleSettings }) {
  const [selectedMode, setSelectedMode] = useState("classic")
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy")

  const handleStartGame = () => {
    startGame(selectedMode, selectedDifficulty)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-teal-700 rounded-xl shadow-lg max-w-md w-full">
      <div className="flex items-center gap-2 mb-2">
        <FaTrophy className="text-yellow-400 text-2xl" />
        <span className="text-xl">High Score: {highScore}</span>
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2">Game Mode:</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${selectedMode === "classic" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedMode("classic")}
          >
            <FaPlay className="text-xl mb-1" />
            <span>Classic</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${selectedMode === "timed" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedMode("timed")}
          >
            <FaHourglassHalf className="text-xl mb-1" />
            <span>Timed</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${selectedMode === "challenge" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedMode("challenge")}
          >
            <FaFire className="text-xl mb-1" />
            <span>Challenge</span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2">Difficulty:</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`p-3 rounded-lg transition-colors ${selectedDifficulty === "easy" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`p-3 rounded-lg transition-colors ${selectedDifficulty === "medium" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`p-3 rounded-lg transition-colors ${selectedDifficulty === "hard" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-700"}`}
            onClick={() => setSelectedDifficulty("hard")}
          >
            Hard
          </button>
        </div>
      </div>

      <button
        onClick={handleStartGame}
        className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 rounded-lg text-xl font-bold transition-colors"
      >
        Start Game
      </button>

      <div className="flex gap-3 w-full">
        <button
          onClick={toggleInstructions}
          className="flex items-center justify-center gap-2 flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
        >
          <FaInfoCircle /> How to Play
        </button>
        <button
          onClick={toggleSettings}
          className="flex items-center justify-center gap-2 flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors"
        >
          <FaCog /> Settings
        </button>
      </div>
    </div>
  )
}
