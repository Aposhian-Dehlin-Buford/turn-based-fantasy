import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { connect } from "react-redux"
import { updateResources, updateActivePlayer } from "../redux/newGameReducer"

const Game = ({ updateResources, updateActivePlayer }) => {
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const { user } = useSelector(({ authReducer }) => authReducer)
  const { active, map, me, resources, room } = useSelector(
    ({ newGameReducer }) => newGameReducer
  )
  // const { me, opponent, players, map, active, activePlayer, room } = gameState
  // console.log(gameState)
  useEffect(() => {
    socket.on("update-resources", (resources) => {
      updateResources(resources)
    })
    socket.on("change-player", () => {
      updateActivePlayer()
    })
  }, [])
  return (
    <div>
      <div>Game</div>
      <div>
        <div>My Tech: {resources.tech}</div>
        {active && (
          <button
            onClick={() =>
              socket.emit("end-turn", {
                resources: resources,
                // activePlayer,
                room,
              })
            }
          >
            End Turn
          </button>
        )}
      </div>
    </div>
  )
}

export default connect(null, { updateResources, updateActivePlayer })(Game)
