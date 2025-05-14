import { FaStar, FaTrophy } from "react-icons/fa"

export default function ScoreBoard({ score, level }) {
  return (
    <div className="flex justify-between items-center w-full max-w-md mb-4 bg-indigo-800 p-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <FaTrophy className="text-yellow-400 text-xl" />
        <span className="text-xl font-bold">{score}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-400 text-xl" />
        <span className="text-xl font-bold">Level {level}</span>
      </div>
    </div>
  )
}
