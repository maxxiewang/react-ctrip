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

//* 输出混合类型的总类型，方便在reducer中使用
export type RecommendProductAction = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction


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
