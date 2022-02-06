import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'
import { ProductDetailSlice } from './productDetail/slice'
//! 这个combineReducers和redux的combinReducrs是无缝连接的，并支持处理sliceReducers
import { combineReducers } from '@reduxjs/toolkit'
// 在redux中，不管reducer还是action都是纯函数

// const store = createStore(languageReducer)

/* 
  languageState 实际上就是languageReducer的输出类型 
  使用了类型的反向注入，使用了ReturnType来从范型中获得
  ReturnType<typeof store.getState>
*/

//! 利用combineReducers函数将两个reducer捆绑起来，然后将捆绑后的保存在本地变量中
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: ProductDetailSlice.reducer
})

// applyMiddleware(thunk)用于异步中间件
// actionLog当作第二个参数传入
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

//! 注意观察这个RootState的类型
export type RootState = ReturnType<typeof store.getState>

export default store