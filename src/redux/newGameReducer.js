import actionTypes from "./actionTypes"
const {
  SET_GAME_STATE,
  UPDATE_RESOURCES,
  UPDATE_MAP,
  UPDATE_ACTIVE_PLAYER,
} = actionTypes

const initialState = {
  active: false,
  gameStart: false,
  room: "",
  activePlayer: 0,
  players: [],
  resources: {},
  map: [],
  //   me: null,
  //   opponent: null,
  //   buildings: {},
  //   units: {},
}

export function setGameState(payload, user_id) {
  return {
    type: SET_GAME_STATE,
    payload: {
      ...payload,
      active: payload.players[payload.activePlayer].user_id === user_id ? true : false,
    },
  }
}

export function updateResources(payload) {
  return { type: UPDATE_RESOURCES, payload }
}

export function updateActivePlayer() {
  return { type: UPDATE_ACTIVE_PLAYER }
}

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_GAME_STATE:
      return { ...payload }
    case UPDATE_RESOURCES:
      return { ...state, resources: payload }
    case UPDATE_ACTIVE_PLAYER:
      return { ...state, active: state.active ? false : true }
    default:
      return state
  }
}
