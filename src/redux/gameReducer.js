import actionTypes from './actionTypes'
const {SET_GAME_STATE, SET_MAP_STATE} = actionTypes

const initialState = {
    me: null,
    gameState: {
        activePlayer: null,
        players: [],
        gameStart: false,
        map: {},
    },

}

export function setGameState(payload, user_id){
    console.log('hit reducer')
    if(payload.players[0].user_id === user_id){
        const active = payload.activePlayer === 0 ? true: false
        const gameState = {...payload, me: payload.players[0], opponent: payload.players[1], active}
        return {type: SET_GAME_STATE, payload: gameState}
    }else{
        const active = payload.activePlayer === 1 ? true: false
        const gameState = {...payload, me: payload.players[1], opponent: payload.players[0], active}
        return {type: SET_GAME_STATE, payload: gameState}
    }
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