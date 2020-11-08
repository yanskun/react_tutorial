import { combineReducers, createStore } from 'redux'
import { Reducer, State } from './reducer'

export type GameState = {
  state: State
}

const store = createStore(
  combineReducers<GameState>({
    state: Reducer
  })
)

export default store
