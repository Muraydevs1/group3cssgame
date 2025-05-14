"use client"

import { FaPause } from "react-icons/fa"

export default function GameControls({ pauseGame }) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={pauseGame}
        className="flex items-center gap-2 py-2 px-4 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-medium transition-colors"
      >
        <FaPause /> Pause Game
      </button>
    </div>
  )
}
