"use client"

export default function Card({ symbol, isFlipped, isMatched, onClick }) {
  return (
    <div
      className={`aspect-square cursor-pointer perspective-500 transform transition-transform duration-500 ${isMatched ? "scale-95 opacity-70" : ""}`}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-teal-500 ${isFlipped ? "hidden" : ""}`}
        >
          <div className="w-1/2 h-1/2 bg-teal-400 rounded-full opacity-50"></div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full backface-hidden bg-white rounded-xl flex items-center justify-center shadow-lg border-2 ${isMatched ? "border-green-500" : "border-yellow-400"} rotate-y-180 ${isFlipped ? "" : "hidden"}`}
        >
          <span className="text-4xl sm:text-5xl md:text-6xl">{symbol}</span>
        </div>
      </div>
    </div>
  )
}
