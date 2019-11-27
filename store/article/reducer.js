import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultStore = fromJS({
  articles: [],
  page: 1,
  hasNextPage: true
})

export default (state = defaultStore, action) => {
  switch (action.type) {
    case constants.STORE_ARTICLES:
      return state.set('articles', action.data)
    case constants.STORE_PAGE:
      return state.set('page', action.data)
    case constants.HAS_NEXT_PAGE:
      return state.set('hasNextPage', action.data)
    default:
      return state
  }
}