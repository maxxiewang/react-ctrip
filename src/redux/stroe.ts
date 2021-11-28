import { createStore } from 'redux'
import languageReducer from './language/languageReducer'
// 在redux中，不管reducer还是action都是纯函数
// 处理语言状态设置的languageReducer

const store = createStore(languageReducer)
/* 
  languageState 实际上就是languageReducer的输出类型 
  使用了类型的反向注入，使用了ReturnType来从范型中获得
  ReturnType<typeof store.getState>
*/
export type RootState = ReturnType<typeof store.getState>

export default store