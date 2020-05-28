import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateResources, updateActivePlayer } from "../redux/newGameReducer"

const Game = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const { user } = useSelector(({ authReducer }) => authReducer)
  const { active, map, me, resources, room } = useSelector(
    ({ newGameReducer }) => newGameReducer
  )
  useEffect(() => {
    socket.on("update-resources", (resources) => {
      dispatch(updateResources(resources))
    })
    socket.on("change-player", () => {
      dispatch(updateActivePlayer())
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

export default Game
