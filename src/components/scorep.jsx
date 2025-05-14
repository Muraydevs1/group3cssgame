import { FaStar, FaStopwatch, FaGamepad } from "react-icons/fa"

export default function ScorePanel({ score, moves, timeLeft, gameMode }) {
  return (
    <div className="flex justify-between items-center w-full max-w-4xl mb-6 bg-teal-700 p-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-400 text-xl" />
        <span className="text-xl font-bold">{score}</span>
      </div>

      <div className="flex items-center gap-2">
        <FaGamepad className="text-white text-xl" />
        <span className="text-xl font-bold">{moves} Moves</span>
      </div>

      {gameMode === "timed" && (
        <div className="flex items-center gap-2">
          <FaStopwatch className="text-white text-xl" />
          <span className="text-xl font-bold">{timeLeft}s</span>
        </div>
      )}
    </div>
  )
}
