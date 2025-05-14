"use client"

import { useState } from "react"
import { FaTimes, FaHome } from "react-icons/fa"

export default function Settings({ onClose, difficulty, setDifficulty, theme, changeTheme, returnToMenu }) {
  const [localDifficulty, setLocalDifficulty] = useState(difficulty)
  const [localTheme, setLocalTheme] = useState(theme)

  const handleSave = () => {
    setDifficulty(localDifficulty)
    changeTheme(localTheme)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-teal-700 rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-teal-600 rounded-full">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Difficulty:</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                className={`p-3 rounded-lg transition-colors ${localDifficulty === "easy" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalDifficulty("easy")}
              >
                Easy
              </button>
              <button
                className={`p-3 rounded-lg transition-colors ${localDifficulty === "medium" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalDifficulty("medium")}
              >
                Medium
              </button>
              <button
                className={`p-3 rounded-lg transition-colors ${localDifficulty === "hard" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Card Theme:</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`p-3 rounded-lg transition-colors ${localTheme === "animals" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalTheme("animals")}
              >
                Animals 🐶 🐱 🐭
              </button>
              <button
                className={`p-3 rounded-lg transition-colors ${localTheme === "space" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalTheme("space")}
              >
                Space 🚀 🛸 🌍
              </button>
              <button
                className={`p-3 rounded-lg transition-colors ${localTheme === "food" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalTheme("food")}
              >
                Food 🍎 🍕 🍔
              </button>
              <button
                className={`p-3 rounded-lg transition-colors ${localTheme === "sports" ? "bg-teal-500" : "bg-teal-800 hover:bg-teal-600"}`}
                onClick={() => setLocalTheme("sports")}
              >
                Sports ⚽ 🏀 🏈
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleSave}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors"
            >
              Save Settings
            </button>

            {returnToMenu && (
              <button
                onClick={returnToMenu}
                className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors"
              >
                <FaHome /> Return to Menu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
