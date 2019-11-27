// redux: JavaScript状态管理器
import { createStore, applyMiddleware } from 'redux'

// 中间件：dispatch一个action之后，到达reducer之前，进行一些额外的操作
import thunk from 'redux-thunk'

// 调试工具
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
  return store
}

export default configureStore
