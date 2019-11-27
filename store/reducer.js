// 用于reducer的拆分
import { combineReducers } from 'redux'
import { reducer as articleReducer } from './article'

export default combineReducers({
  article: articleReducer
})