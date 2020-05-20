import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'
import socketReducer from './socketReducer'

const reducers = combineReducers({authReducer, socketReducer})

export default createStore(reducers, applyMiddleware(promiseMiddleware))