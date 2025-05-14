"use client"

import { FaTimes, FaPlay, FaHourglassHalf, FaFire, FaEye, FaRedo, FaBolt, FaClock } from "react-icons/fa"

export default function Instructions({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-teal-700 rounded-xl shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">How to Play</h2>
          <button onClick={onClose} className="p-2 hover:bg-teal-600 rounded-full">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <p>Welcome to Memory Match! Flip cards to find matching pairs and test your memory skills.</p>

          <h3 className="text-xl font-semibold mt-4">Game Modes:</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
                <FaPlay className="text-xl" />
              </div>
              <p>
                <strong>Classic:</strong> Find all pairs at your own pace.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
                <FaHourglassHalf className="text-xl" />
              </div>
              <p>
                <strong>Timed:</strong> Race against the clock to find all pairs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-md flex items-center justify-center">
                <FaFire className="text-xl" />
              </div>
              <p>
                <strong>Challenge:</strong> Use special power-ups to help you match cards.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-4">Power-ups:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FaEye className="text-xl" />
              </div>
              <p>
                <strong>Reveal:</strong> Peek at a card without flipping it.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <FaRedo className="text-xl" />
              </div>
              <p>
                <strong>Shuffle:</strong> Rearrange all unmatched cards.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <FaBolt className="text-xl" />
              </div>
              <p>
                <strong>Match:</strong> Automatically match a pair.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <FaClock className="text-xl" />
              </div>
              <p>
                <strong>Time:</strong> Add 15 seconds to the timer (Timed mode only).
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-4">Scoring:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>10 points for each matched pair</li>
            <li>Bonus points when you complete a level (based on difficulty)</li>
            <li>Try to use as few moves as possible for a better score!</li>
          </ul>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
