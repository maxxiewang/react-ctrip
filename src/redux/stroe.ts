import { createStore } from 'redux'
import languageReducer from './languageReducer'
// 在redux中，不管reducer还是action都是纯函数
// 处理语言状态设置的languageReducer



const store2 = createStore(languageReducer)

export default store2