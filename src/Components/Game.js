import React, {useEffect} from "react"
import { useSelector } from "react-redux"
import {connect} from 'react-redux'
import {updateResources, updateActivePlayer} from '../redux/gameReducer'

const Game = ({updateResources, updateActivePlayer}) => {
  const { socket } = useSelector(({ socketReducer }) => socketReducer)
  const {user} = useSelector(({authReducer}) => authReducer)
  const { gameState } = useSelector(({ gameReducer }) => gameReducer)
  const { me, opponent, players, map, active, activePlayer, room } = gameState
  useEffect(() => {
    socket.on('update-resources', (resources) => {
      updateResources(resources)
    })
    socket.on('change-player', (activePlayer) => {
      updateActivePlayer(activePlayer)
    })
  }, [])
  return (
    <div>
      <div>Game</div>
      <div>
        <div>My Tech: {me.resources.tech}</div>
        {active && (
          <button
            onClick={() =>
              socket.emit("end-turn", {
                resources: me.resources,
                activePlayer,
                room
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

export default connect(null, {updateResources, updateActivePlayer})(Game)
