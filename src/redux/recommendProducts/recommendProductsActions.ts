import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import axios from "axios"
//* 首先考虑一下action的类型

export const FETCH_RECOMMEND_PRODUCTS_START =
  "FETCH_RECOMMEND_PRODUCTS_START" // 正在调用API

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  'FETCH_RECOMMEND_PRODUCTS_SUCCESS' // 调用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL =
  'FETCH_RECOMMEND_PRODUCTS_FAIL'   // 调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START,
  payload: any
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

//* 输出混合类型的总类型，方便在reducer中使用
export type RecommendProductAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction


// action的创建工厂
export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
    payload: []
  }
}
//! 这个data参数就是API成功返回后的数据
export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error
  }
}

//! thunk的作用就是让dispatch多支持一种类型：函数类型，返回对像不只是一个action，而是一个函数
//! 这个函数的类型，就是thunk的action类型。ThunkAction定义比较复杂

/*  thunk 可以返回一个函数，而不一定是js对象。
    在一个thunk action中可以完成一系列连续的action操作，并且可以处理异步逻辑。业务逻辑可以从ui层面挪到这里，代码分层会更清晰。
*/
export const getDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator())
    try {
      const { data } = await axios.get(
        'https://mock.mengxuegu.com/mock/61a78040c6b34465f53db98f/reactTrip/api/productCollections'
      )
      dispatch(fetchRecommendProductSuccessActionCreator(data.data))
    } catch (error: any) {
      dispatch(fetchRecommendProductFailActionCreator(error.essage))
    }
  }
