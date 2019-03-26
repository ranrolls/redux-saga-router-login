import { combineReducers } from 'redux'
import { core } from './core'
import { user } from './user'
import { counter, countdown } from './counter'
import { postsByReddit, selectedReddit } from './reddit'
const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  countdown,
  counter,
  user,
  core
})
export default rootReducer
