import React from "react"
import { useSelector } from "react-redux"

const Game = () => {
  const { gameState } = useSelector(({ gameReducer }) => gameReducer)
  const {me, opponent, players, map, active} = gameState
  console.log(gameState)
  return (
    <div>
      <div>Game</div>
        <div>
          <div>My Tech: {me.resources.tech}</div>
          <div>Their Tech: {opponent.resources.tech}</div>
          {active && <button>End Turn</button>}
        </div>
    </div>
  )
}

export default Game
