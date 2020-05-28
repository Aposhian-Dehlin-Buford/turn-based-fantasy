import actionTypes from "./actionTypes"
const {
  SET_GAME_STATE,
  UPDATE_RESOURCES,
  SET_MAP_STATE,
  UPDATE_ACTIVE_PLAYER,
} = actionTypes

const initialState = {
  me: null,
  gameState: {
    activePlayer: null,
    players: [],
    gameStart: false,
    map: {},
  },
}

export function setGameState(payload, user_id) {
  if (payload.players[0].user_id === user_id) {
    const active = payload.activePlayer === 0 ? true : false
    const gameState = {
      ...payload,
      me: payload.players[0],
      opponent: payload.players[1],
      active,
    }
    return { type: SET_GAME_STATE, payload: gameState }
  } else {
    const active = payload.activePlayer === 1 ? true : false
    const gameState = {
      ...payload,
      me: payload.players[1],
      opponent: payload.players[0],
      active,
    }
    return { type: SET_GAME_STATE, payload: gameState }
  }
}

export function updateResources(payload) {
  console.log(payload)
  return { type: UPDATE_RESOURCES, payload }
}

export function updateActivePlayer(payload) {
  return { type: UPDATE_ACTIVE_PLAYER, payload }
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      return { ...state, gameState: payload }
    case UPDATE_RESOURCES:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          me: { ...state.gameState.me, resources: payload },
        },
      }
    case UPDATE_ACTIVE_PLAYER:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          active: state.gameState.active ? false : true,
        },
      }
    default:
      return state
  }
}
