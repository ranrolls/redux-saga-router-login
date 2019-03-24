import { combineReducers } from 'redux'
import { core } from './core'
import { counter, countdown } from './counter'
import { postsByReddit, selectedReddit } from './reddit'
const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  countdown,
  counter,
  core
})
export default rootReducer
