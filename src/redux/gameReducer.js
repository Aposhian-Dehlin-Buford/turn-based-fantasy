import actionTypes from './actionTypes'
const {SET_GAME_STATE} = actionTypes

const initialState = {
    gameState: {
        activePlayer: null,
        players: [],
        gameStart: false
    }
}

export function setGameState(payload){
    return {type: SET_GAME_STATE, payload}
}

export default function gameReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_GAME_STATE:
            return {...state, gameState: payload}
        default:
            return state
    }
}