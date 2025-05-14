"use client"

export default function PowerUp({ type, icon, color, onClick, active }) {
  // Power-up descriptions
  const descriptions = {
    reveal: "Peek at a card",
    shuffle: "Shuffle all cards",
    match: "Auto-match a pair",
    time: "Add 15 seconds",
  }

  return (
    <div className="relative group">
      <button
        className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white text-xl shadow-lg transition-transform ${active ? "ring-4 ring-white scale-110" : "hover:scale-110"}`}
        onClick={onClick}
      >
        {icon}
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {descriptions[type]}
      </div>
    </div>
  )
}
