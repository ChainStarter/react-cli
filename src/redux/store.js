import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import index from './index'
import mining from './mining'

const store = createStore(
  combineReducers({
    index,
    mining
  }),
  applyMiddleware(thunkMiddleware)
)

export default store
