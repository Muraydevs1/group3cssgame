"use client"

import { useState, useEffect, useCallback } from "react"
import GameBoard from "./gameb"
import ScorePanel from "./scorep"
import GameMenu from "./gamem"
import GameOver from "./gameo"
import Instructions from "./instructions"
import { FaCog } from "react-icons/fa"
import Settings from "./settings"

export default function MemoryMatchGame() {
  const [gameState, setGameState] = useState("menu") // menu, playing, gameOver
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [highScore, setHighScore] = useState(0)
  const [gameMode, setGameMode] = useState("classic") // classic, timed, challenge
  const [difficulty, setDifficulty] = useState("easy") // easy, medium, hard
  const [showInstructions, setShowInstructions] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState("animals") // animals, space, food, sports

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("memoryMatchHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score to localStorage when it changes
  useEffect(() => {
    if (score > highScore && gameState === "gameOver") {
      setHighScore(score)
      localStorage.setItem("memoryMatchHighScore", score.toString())
    }
  }, [score, highScore, gameState])

  // Timer for timed mode
  useEffect(() => {
    if (gameState !== "playing" || gameMode !== "timed") return

    if (timeLeft <= 0) {
      endGame()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, gameState, gameMode])

  const startGame = (mode, diff) => {
    setGameMode(mode || gameMode)
    setDifficulty(diff || difficulty)
    setScore(0)
    setMoves(0)

    // Set time based on difficulty and mode
    if (mode === "timed" || gameMode === "timed") {
      if (diff === "easy" || difficulty === "easy") setTimeLeft(60)
      else if (diff === "medium" || difficulty === "medium") setTimeLeft(45)
      else setTimeLeft(30)
    }

    setGameState("playing")
  }

  const endGame = () => {
    setGameState("gameOver")
  }

  const returnToMenu = () => {
    setGameState("menu")
  }

  const updateScore = useCallback((points) => {
    setScore((prev) => prev + points)
  }, [])

  const incrementMoves = () => {
    setMoves((prev) => prev + 1)
  }

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev)
  }

  const toggleSettings = () => {
    setShowSettings((prev) => !prev)
  }

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-800 to-emerald-900 text-white flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg">Memory Match</h1>
        {gameState !== "menu" && (
          <button onClick={toggleSettings} className="p-2 bg-teal-700 hover:bg-teal-600 rounded-full">
            <FaCog className="text-xl" />
          </button>
        )}
      </header>

      {gameState === "menu" && (
        <GameMenu
          startGame={startGame}
          highScore={highScore}
          toggleInstructions={toggleInstructions}
          toggleSettings={toggleSettings}
        />
      )}

      {gameState === "playing" && (
        <>
          <ScorePanel score={score} moves={moves} timeLeft={timeLeft} gameMode={gameMode} />
          <GameBoard
            difficulty={difficulty}
            gameMode={gameMode}
            theme={theme}
            updateScore={updateScore}
            incrementMoves={incrementMoves}
            endGame={endGame}
          />
        </>
      )}

      {gameState === "gameOver" && (
        <GameOver
          score={score}
          moves={moves}
          highScore={highScore}
          returnToMenu={returnToMenu}
          startNewGame={() => startGame()}
        />
      )}

      {showInstructions && <Instructions onClose={toggleInstructions} />}

      {showSettings && (
        <Settings
          onClose={toggleSettings}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          theme={theme}
          changeTheme={changeTheme}
          returnToMenu={gameState === "playing" ? returnToMenu : null}
        />
      )}
    </div>
  )
}
