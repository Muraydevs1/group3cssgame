"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Card from "./card"
import PowerUp from "./poweru"
import { FaBolt, FaEye, FaRedo, FaClock } from "react-icons/fa"

export default function GameBoard({ difficulty, gameMode, theme, updateScore, incrementMoves, endGame }) {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [powerUps, setPowerUps] = useState([])
  const [isChecking, setIsChecking] = useState(false)
  const [activePowerUp, setActivePowerUp] = useState(null)
  const [disabledCards, setDisabledCards] = useState([])
  const bonusAwarded = useRef(false)

  // Set up the game board based on difficulty
  useEffect(() => {
    const cardCounts = {
      easy: 12, // 6 pairs
      medium: 20, // 10 pairs
      hard: 30, // 15 pairs
    }

    const cardCount = cardCounts[difficulty]
    generateCards(cardCount)

    // Generate power-ups based on game mode
    if (gameMode === "challenge") {
      generatePowerUps()
    } else {
      setPowerUps([])
    }
  }, [difficulty, gameMode, theme])

  // Check for game completion
  useEffect(() => {
    // Only run this effect when we've found all pairs and there are cards to match
    if (cards.length > 0 && matchedPairs.length === cards.length / 2 && matchedPairs.length > 0) {
      // Calculate bonus points based on difficulty
      const difficultyMultiplier = { easy: 1, medium: 2, hard: 3 }
      const bonus = 50 * difficultyMultiplier[difficulty]

      // Use a ref to track if we've already awarded the bonus
      // to prevent multiple score updates
      if (!bonusAwarded.current) {
        updateScore(bonus)
        bonusAwarded.current = true
        setTimeout(() => endGame(), 1000)
      }
    }
  }, [matchedPairs.length, cards.length, difficulty, updateScore, endGame])

  const generateCards = (count) => {
    // Define card themes
    const cardThemes = {
      animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵"],
      space: ["🚀", "🛸", "🌍", "🌙", "⭐", "☄️", "🪐", "👽", "🌠", "🌌", "🔭", "👨‍🚀", "🛰️", "🌑", "🌞"],
      food: ["🍎", "🍕", "🍔", "🍦", "🍩", "🍓", "🍇", "🍉", "🍌", "🍣", "🌮", "🍪", "🍫", "🥑", "🍒"],
      sports: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥊", "🏊‍♂️", "🚴‍♀️", "⛷️", "🏄‍♂️"],
    }

    const selectedTheme = cardThemes[theme] || cardThemes.animals
    const pairCount = count / 2

    // Create pairs of cards
    const cardPairs = []
    for (let i = 0; i < pairCount; i++) {
      const symbol = selectedTheme[i % selectedTheme.length]
      cardPairs.push({ id: `card-${i}-a`, symbol, matched: false })
      cardPairs.push({ id: `card-${i}-b`, symbol, matched: false })
    }

    // Shuffle cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]]
    }

    setCards(cardPairs)
    setFlippedIndices([])
    setMatchedPairs([])
    setDisabledCards([])
    bonusAwarded.current = false
  }

  const generatePowerUps = () => {
    const powerUpTypes = [
      { type: "reveal", icon: <FaEye />, color: "bg-blue-500" },
      { type: "shuffle", icon: <FaRedo />, color: "bg-purple-500" },
      { type: "match", icon: <FaBolt />, color: "bg-yellow-500" },
      { type: "time", icon: <FaClock />, color: "bg-green-500" },
    ]

    // Generate 2-3 random power-ups
    const count = Math.floor(Math.random() * 2) + 2
    const newPowerUps = []

    for (let i = 0; i < count; i++) {
      const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
      newPowerUps.push({
        id: `power-${i}`,
        ...randomType,
      })
    }

    setPowerUps(newPowerUps)
  }

  const handleCardClick = useCallback(
    (index) => {
      // Prevent clicking if already checking a pair or card is disabled
      if (
        isChecking ||
        flippedIndices.includes(index) ||
        matchedPairs.includes(cards[index].symbol) ||
        disabledCards.includes(index)
      ) {
        return
      }

      // Handle reveal power-up
      if (activePowerUp === "reveal") {
        // Show card briefly then flip back
        setFlippedIndices((prev) => [...prev, index])
        setTimeout(() => {
          setFlippedIndices((prev) => prev.filter((i) => i !== index))
          setActivePowerUp(null)
        }, 1000)
        return
      }

      // Handle match power-up
      if (activePowerUp === "match") {
        const clickedSymbol = cards[index].symbol
        const matchingIndices = cards.map((card, i) => (card.symbol === clickedSymbol ? i : -1)).filter((i) => i !== -1)

        setFlippedIndices((prev) => [...prev, ...matchingIndices])
        setMatchedPairs((prev) => [...prev, clickedSymbol])
        updateScore(10)
        setActivePowerUp(null)
        return
      }

      // Normal card flipping logic
      const newFlipped = [...flippedIndices, index]
      setFlippedIndices(newFlipped)

      // If we have flipped 2 cards, check for a match
      if (newFlipped.length === 2) {
        incrementMoves()
        setIsChecking(true)

        const [firstIndex, secondIndex] = newFlipped
        const firstCard = cards[firstIndex]
        const secondCard = cards[secondIndex]

        if (firstCard.symbol === secondCard.symbol) {
          // Match found
          setMatchedPairs((prev) => [...prev, firstCard.symbol])
          updateScore(10)
          setFlippedIndices([])
          setIsChecking(false)
        } else {
          // No match, flip cards back
          setTimeout(() => {
            setFlippedIndices([])
            setIsChecking(false)
          }, 1000)
        }
      }
    },
    [cards, flippedIndices, matchedPairs, isChecking, activePowerUp, incrementMoves, updateScore, disabledCards],
  )

  const usePowerUp = (type) => {
    setActivePowerUp(type)

    if (type === "shuffle") {
      // Shuffle all unmatched cards
      const newCards = [...cards]
      const unmatchedIndices = newCards
        .map((card, index) => (!matchedPairs.includes(card.symbol) ? index : -1))
        .filter((index) => index !== -1)

      // Fisher-Yates shuffle for unmatched cards
      for (let i = unmatchedIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = newCards[unmatchedIndices[i]]
        newCards[unmatchedIndices[i]] = newCards[unmatchedIndices[j]]
        newCards[unmatchedIndices[j]] = temp
      }

      setCards(newCards)
      setActivePowerUp(null)
    }

    // Remove the used power-up
    setPowerUps((prev) => prev.filter((p) => p.type !== type))
  }

  // Determine grid columns based on difficulty
  const getGridColumns = () => {
    switch (difficulty) {
      case "easy":
        return "grid-cols-3 sm:grid-cols-4"
      case "medium":
        return "grid-cols-4 sm:grid-cols-5"
      case "hard":
        return "grid-cols-5 sm:grid-cols-6"
      default:
        return "grid-cols-4"
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
      {gameMode === "challenge" && powerUps.length > 0 && (
        <div className="flex justify-center gap-3 mb-2">
          {powerUps.map((powerUp) => (
            <PowerUp
              key={powerUp.id}
              type={powerUp.type}
              icon={powerUp.icon}
              color={powerUp.color}
              onClick={() => usePowerUp(powerUp.type)}
              active={activePowerUp === powerUp.type}
            />
          ))}
        </div>
      )}

      <div className={`grid ${getGridColumns()} gap-2 md:gap-4 w-full`}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.symbol)}
            isMatched={matchedPairs.includes(card.symbol)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
