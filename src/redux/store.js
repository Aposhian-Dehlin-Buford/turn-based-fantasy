import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'

const reducers = combineReducers({authReducer})

export default createStore(reducers, applyMiddleware(promiseMiddleware))